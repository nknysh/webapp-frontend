import { createSelector } from 'reselect';
import { generateArrayOfDatesBetween } from 'utils';
import {
  IOfferPrerequisitesPayload,
  IOfferProductDiscountInstance,
  IOfferStepping,
} from 'services/BackendApi';
import {
  getBootstrapCountriesSelector,
  getBootstrapExtraPersonSupplementProductSelector,
} from '../../../bootstrap/selectors';
import { groupBy, flatten, uniq, reduce } from 'ramda';
import { ITaCountriesUiData as IOfferTaCountriesPreRequisiteUi } from '../../types';
import {
  offerDomainSelector,
  getAccommodationProductsForHotelSelector as hotelAccomodationProductsSelector,
  availableGroundServiceProductsSelector, 
  availableMealPlanProductsSelector, 
  availableTransferProductsSelector, 
  availableSupplementProductsSelector, 
  availableFineProductsSelector 
} from '../../domainSelectors';
import { IAgeName, IUIOfferProductDiscountInstance } from '../../../../../services/BackendApi/types/OfferResponse';
import { Validator, ValidatorFieldResult, OfferValidatorResultSet, ValidatorFieldError } from '../../validation';
import { returnObjectWithUndefinedsAsEmptyStrings, discountsWithCategory } from '../../utils';
import { uiStateSelector } from '../uiState/selectors';

export interface IAccomodationProductPreRequisiteUi {
  label: string;
  uuid: string;
  value: boolean;
  ageNames: IAgeName[]
}

export const offerSelector = createSelector(offerDomainSelector, domain => domain.offer);

export const offerHotelUuidSelector = createSelector(offerSelector, offer => offer.hotelUuid);

export const offerHotelSelector = createSelector(offerSelector, offer => offer.hotel);
export const offerHotelCountryCodeSelector = createSelector(offerHotelSelector, hotel => hotel?.countryCode);
export const offerRequiresGreenTaxApproachSelector = createSelector(
  offerHotelUuidSelector,
  offerHotelCountryCodeSelector,
  (hotelUuid, countryCode): boolean => {
    return Boolean(hotelUuid && countryCode === 'MV');
  }
);

export const offerNameSelector = createSelector(offerSelector, offer => offer.name);

export const offerTermsSelector = createSelector(offerSelector, offer => offer.termsAndConditions);
export const offerFurtherInformationSelector = createSelector(offerSelector, offer => offer.furtherInformation || '');
export const offerPrerequisitesSelector = createSelector(offerSelector, offer => offer.prerequisites);

export const offerPayloadPrerequisitesSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.payload
);

export const offerStayBetweenPrerequisitesSelector = createSelector(offerPrerequisitesSelector, prerequisites => {
  return prerequisites.dates.map(dateRange => {
    if (!dateRange.startDate || dateRange.startDate === '') {
      return [];
    }
    if (!dateRange.endDate || dateRange.endDate === '') {
      return [dateRange.startDate];
    }
    return generateArrayOfDatesBetween(dateRange.startDate, dateRange.endDate);
  });
});

export const offerStayBetweenPrerequisitesRawSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.dates
);

export const offerBooleanPrerequisitesSelector = createSelector(
  offerPayloadPrerequisitesSelector,
  (payload): IOfferPrerequisitesPayload => {
    const keys = ['anniversary', 'birthday', 'honeymoon', 'repeatCustomer', 'wedding'];
    const returnedPayload = {} as IOfferPrerequisitesPayload;

    keys.forEach(payloadKey => {
      if (payload && payload[payloadKey] !== undefined) {
        returnedPayload[payloadKey] = payload[payloadKey];
      } else {
        returnedPayload[payloadKey] = null;
      }
    });

    return returnedPayload;
  }
);

export const offerPreDiscountSelector = createSelector(offerSelector, offer => offer.preDiscount);

export const hotelNameSelector = createSelector(offerSelector, offer => offer.hotel?.name);
export const offerCountryCodePrerequisiteSelector = createSelector(offerPrerequisitesSelector, prerequisites => {
  return prerequisites.countryCodes || [];
});

export const offerTaCountriesPrerequisiteSelector = createSelector(
  offerCountryCodePrerequisiteSelector,
  getBootstrapCountriesSelector,
  (prerequisiteCountries, countries) => {
    return countries.map(country => {
      if (prerequisiteCountries.includes(country.code)) {
        return {
          label: country.name,
          region: country.region,
          value: true,
          code: country.code,
        };
      } else {
        return {
          label: country.name,
          region: country.region,
          value: false,
          code: country.code,
        };
      }
    });
  }
);

export const offerTaCountriesPrerequisiteByRegionSelector = createSelector(
  offerTaCountriesPrerequisiteSelector,
  (countries): IOfferTaCountriesPreRequisiteUi => {
    const grouped = groupBy(c => c.region, countries);

    return Object.keys(grouped).reduce((acc, group) => {
      const count = grouped[group].reduce((acc, next) => (next.value ? acc + 1 : acc), 0);
      const total = count === 1 ? '1 Country' : `${count} Countries`;
      acc[group] = {
        total,
        countries: grouped[group],
      };

      return acc;
    }, {});
  }
);

export const offerTaCountriesLabelPrerequisiteSelector = createSelector(
  offerCountryCodePrerequisiteSelector,
  (prerequisiteCountries) => {
    if (prerequisiteCountries.length < 1) {
      return 'Any Countries';
    } else {
      return `${prerequisiteCountries.length} Countries`;
    }
  }
);

export const offerAccommodationProductPrerequisitesRawSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.accommodationProducts || []
);

export interface IAccomodationProductPreRequisiteUi {
  label: string;
  uuid: string;
  value: boolean;
  ageNames: IAgeName[];
}

export interface IAgeNamesMap {
  [key: string]: {
    ageFrom?: number;
    ageTo?: number;
  };
}

export const offerAccommodationProductPrerequisitesSelector = createSelector(
  offerAccommodationProductPrerequisitesRawSelector,
  hotelAccomodationProductsSelector,
  (accommodationProductPrerequisites, accommodationProductsOnHotel): IAccomodationProductPreRequisiteUi[] => {
    if (!accommodationProductsOnHotel) {
      return [];
    }
    return accommodationProductsOnHotel?.map(accommodationProduct => ({
      label: accommodationProduct.name,
      uuid: accommodationProduct.uuid,
      value: accommodationProductPrerequisites.includes(accommodationProduct.uuid),
      ageNames: accommodationProduct.options.ages,
    }));
  }
);

export const isAccomodationPreReqAllSelected = createSelector(
  offerAccommodationProductPrerequisitesRawSelector,
  (accommodationProductPrerequisites) =>
    Boolean(accommodationProductPrerequisites.length < 1 )
);

export const offerAccommodationProductPrerequisitesLabelSelector = createSelector(
  offerAccommodationProductPrerequisitesRawSelector,
  isAccomodationPreReqAllSelected,
  (accommodationProductPrerequisites, isAll) => {
    return isAll ? 'Any Accommodation Products' : `${accommodationProductPrerequisites.length} Accommodation Products`;
  }
);

export const accomodationPreRequisiteAgeNamesSelector = createSelector(
  offerAccommodationProductPrerequisitesSelector,
  accomProducts => {
    // Get a unqiue map of age names with age ranges
    const ageNamesMap = accomProducts
      .map(ap => ap.ageNames)
      .reduce((acc, next) => [...acc, ...next], [])
      .reduce((acc, next) => {
        acc[next.name] = {
          ageFrom: next.ageFrom,
          ageTo: next.ageTo,
        };
        return acc;
      } , {});
    
    return Object.keys(ageNamesMap).reduce((acc, key) => {
      return [...acc, {
        name: key,
        ageFrom: ageNamesMap[key].ageFrom,
        ageTo: ageNamesMap[key].ageTo,
      }]
    }, []).sort((a, b) => b.ageFrom! - a.ageFrom!);
  }
);

export const offerAdvancePrerequisiteSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.advance || { bookBy: '', minimum: '', maximum: '' }
);

export const offerMaxLodgingsPrerequisiteSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.maximumLodgingsInBooking || ''
);

export const offerStayLengthPrerequisiteSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.stayLength || { minimum: '', maximum: '', strictMinMaxStay: false }
);

export const offerSteppingApplicationSelector = createSelector(offerSelector, offer => {
  if (!offer.stepping) {
    return undefined;
  }
  return returnObjectWithUndefinedsAsEmptyStrings(offer.stepping) as IOfferStepping;
});

export const offerAccommodationDiscountSelector = createSelector(offerSelector, offer => {
  return returnObjectWithUndefinedsAsEmptyStrings<IOfferProductDiscountInstance>(offer.accommodationProductDiscount);
});

export const offerSubProductDiscountsSelector = createSelector(offerSelector, offer => {
  return offer.subProductDiscounts || {};
});

export const offersubProductDiscountsSupplementsSelector = createSelector(
  offerSubProductDiscountsSelector,
  (subProductDiscounts): IUIOfferProductDiscountInstance[] => {
    if (!subProductDiscounts || !subProductDiscounts.Supplement) {
      return [];
    }
    return subProductDiscounts.Supplement.map(s => {
      let ageNames = uniq(flatten(s.products.map(p => p.ageNames)));
      return {
        ...s,
        ageNames,
      };
    });
  }
);

export const offerExtraPersonSupplementsSelector = createSelector(
  offersubProductDiscountsSupplementsSelector,
  getBootstrapExtraPersonSupplementProductSelector,
  (supplements, extraPersonSupplementProduct): IUIOfferProductDiscountInstance[] => {
    return supplements.filter(sup => {
      return sup.products.some(p => {
        return p.uuid === extraPersonSupplementProduct.uuid;
      });
    });
  }
);

export const offerProductDiscountsSelector = createSelector(offerSelector, offer => {
  return offer.productDiscounts || {};
});

export const offerProductDiscountsFinesSelector = createSelector(
  offerProductDiscountsSelector, 
  availableFineProductsSelector,
  (productDiscounts, availableProducts): IUIOfferProductDiscountInstance[] => {
  if (!productDiscounts || !productDiscounts.Fine) {
    return [];
  }
  
  return productDiscounts.Fine ? discountsWithCategory(productDiscounts.Fine, availableProducts) : [];
});


export const offerProductDiscountsGroundServicesSelector = createSelector(
  offerProductDiscountsSelector,
  availableGroundServiceProductsSelector,
  (productDiscounts, availableProducts): IUIOfferProductDiscountInstance[] => {
    if (!productDiscounts || !productDiscounts['Ground Service']) {
      return [];
    }
    return productDiscounts['Ground Service'] ? discountsWithCategory(productDiscounts['Ground Service'], availableProducts) : [];
  }
);

export const offersubProductDiscountsMealPlansSelector = createSelector(
  offerSubProductDiscountsSelector,
  availableMealPlanProductsSelector,
  (subProductDiscounts, availableProducts): IUIOfferProductDiscountInstance[] => {
    if (!subProductDiscounts || !subProductDiscounts['Meal Plan']) {
      return [];
    }
  
    return subProductDiscounts['Meal Plan'] ? discountsWithCategory(subProductDiscounts['Meal Plan'], availableProducts) : [];
  }
  );
  
  export const offerProductDiscountsTransfersSelector = createSelector(
    offerProductDiscountsSelector,
    availableTransferProductsSelector,
    (productDiscounts, availableProducts): IUIOfferProductDiscountInstance[] => {
      if (!productDiscounts || !productDiscounts.Transfer) {
        return [];
      }
    
      return productDiscounts.Transfer ? discountsWithCategory(productDiscounts.Transfer, availableProducts) : [];
    }
  );
  
  export const offerProductDiscountsSupplementsSelector = createSelector(
    offerProductDiscountsSelector,
    availableSupplementProductsSelector,
    (productDiscounts, availableProducts): IUIOfferProductDiscountInstance[] => {
    
      if (!productDiscounts || !productDiscounts.Supplement) {
        return [];
      }
      
      return productDiscounts.Supplement ? discountsWithCategory(productDiscounts.Supplement, availableProducts) : [];
  }
);

export const offerHotelValidationSelector = createSelector(offerSelector, offer =>
  new Validator<OfferValidatorResultSet>(offer)
    .required('hotelUuid', 'Hotel is required')
    .string('hotelUuid', 'Hotel must be a string')
    .results()
);

export const offerNameValidationSelector = createSelector(offerSelector, offer =>
  new Validator<OfferValidatorResultSet>(offer)
    .required('name', 'Name is a required field')
    .string('name', 'Name must be a string')
    .results()
);

export const offerTsAndCsValidationSelector = createSelector(offerSelector, offer =>
  new Validator<OfferValidatorResultSet>(offer)
    .required('termsAndConditions', 'Terms and Conditions are required')
    .string('termsAndConditions', 'Terms and Conditions must be a string')
    .results()
);

export const offerAccommodationProductsPrerequisitesValidationSelector = createSelector(
  offerAccommodationProductPrerequisitesRawSelector,
  offerSelector,
  (accommodationPrerequisites, offer) => {
    // For now, this selector never returns any errors.
    // Leaving in, as we may adjust this in the future, and all the wiring is already in place
    return {
      errors: [],
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerStayBetweenPrerequisiteValidationSelector = createSelector(
  offerStayBetweenPrerequisitesRawSelector,
  stayBetweens => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    // stay between needs to exist
    if (stayBetweens.length <= 0) {
      errors.push({
        field: 'stayBetweenPrerequisite',
        message: 'At least 1 stay between prerequisite must be set',
      });
    }

    // stay between end needs to be after start
    stayBetweens.forEach((sb, index) => {
      if (sb.startDate !== undefined && sb.endDate !== undefined) {
        if (new Date(sb.startDate) > new Date(sb.endDate)) {
          errors.push({
            field: 'stayBetweenPrerequisite',
            index,
            message: 'Accommodation prerequisites requires at least 1 item',
          });
        }
      }
    });

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerSteppingValidationSelector = createSelector(offerSteppingApplicationSelector, stepping => {
  const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

  if (stepping) {
    if (stepping.everyXNights === undefined) {
      errors.push({
        field: 'stepping',
        message: 'If Stepping is set, Stepping > Every X Nights is required',
      });
    }

    if (stepping.applyTo === undefined) {
      errors.push({
        field: 'stepping',
        message: 'If Stepping is set, Stepping > Apply To is required',
      });
    }
  }

  return {
    errors,
  } as ValidatorFieldResult<OfferValidatorResultSet>;
});

export const offerProductDiscountsValidationSelector = createSelector(
  offerProductDiscountsSelector,
  productDiscounts => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    if (productDiscounts) {
      if (productDiscounts.Fine) {
        productDiscounts.Fine.forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'fineDiscounts',
              index,
              message: `Fine discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'fineDiscounts',
              index,
              message: `Fine discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }
        });
      }
      if (productDiscounts['Ground Service']) {
        productDiscounts['Ground Service'].forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'groundServiceDiscounts',
              index,
              message: `Ground Service discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'groundServiceDiscounts',
              index,
              message: `Ground Service discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }
        });
      }
      if (productDiscounts.Supplement) {
        productDiscounts.Supplement.forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'supplementDiscounts',
              index,
              message: `Supplement discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'supplementDiscounts',
              index,
              message: `Supplement discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }
        });
      }
      if (productDiscounts.Transfer) {
        productDiscounts.Transfer.forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'transferDiscounts',
              index,
              message: `Transfer discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'transferDiscounts',
              index,
              message: `Transfer discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }
        });
      }
    }

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerSubProductDiscountsValidationSelector = createSelector(
  offerSubProductDiscountsSelector,
  subProductDiscounts => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    if (subProductDiscounts) {
      if (subProductDiscounts['Meal Plan']) {
        subProductDiscounts['Meal Plan'].forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'mealPlanDiscounts',
              index,
              message: `Meal Plan discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'mealPlanDiscounts',
              index,
              message: `Meal Plan discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }
        });
      }
    }

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerExtraPersonSupplementValidationSelector = createSelector(
  offerExtraPersonSupplementsSelector,
  extraPersonSupplementsDiscounts => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    extraPersonSupplementsDiscounts.forEach((discount, index) => {
      if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
        errors.push({
          field: 'extraPersonSupplementDiscounts',
          index,
          message: `Extra Person Supplement discount #${index + 1} - discount percentage is required`,
        });
      } else if (!isPercentageCompliant(discount.discountPercentage)) {
        errors.push({
          field: 'extraPersonSupplementDiscounts',
          index,
          message: `Extra Person Supplement discount #${index +
            1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
        });
      }
    });
    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerFurtherInformationValidationSelector = createSelector(
  offerSelector,
  uiStateSelector,
  (offer, uiState) => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    if (uiState.isTextOnly && (!offer.furtherInformation || offer.furtherInformation === '')) {
      errors.push({
        field: 'furtherInformation',
        message: 'If offer is Text Only, Further Information is required',
      });
    }

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const accommodationDiscountValidationSelector = createSelector(offerSelector, offer => {
  const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

  if (offer.accommodationProductDiscount && offer.accommodationProductDiscount.discountPercentage) {
    if (!isPercentageCompliant(offer.accommodationProductDiscount.discountPercentage)) {
      errors.push({
        field: 'accommodationProductDiscount',
        message: `Accommodation Product discount - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
      });
    }
  }

  return {
    errors,
  } as ValidatorFieldResult<OfferValidatorResultSet>;
});

export const offerValidationSelector = createSelector(
  offerHotelValidationSelector,
  offerNameValidationSelector,
  offerTsAndCsValidationSelector,
  offerFurtherInformationValidationSelector,
  offerAccommodationProductsPrerequisitesValidationSelector,
  offerStayBetweenPrerequisiteValidationSelector,
  offerSteppingValidationSelector,
  offerProductDiscountsValidationSelector,
  offerSubProductDiscountsValidationSelector,
  offerExtraPersonSupplementValidationSelector,
  accommodationDiscountValidationSelector,
  (
    hotelValidatorFieldResult,
    nameValidatorFieldResult,
    tsAndCsValidatorFieldResult,
    furtherInformationValidatorFieldResult,
    accommodationProductValidatorFieldResult,
    stayBetweenValidatorFieldResult,
    steppingValidatorFieldResult,
    productDiscountsValidatorFieldResult,
    subProductDiscountsValidatorFieldResult,
    epsDiscountsValidatorFieldResult,
    accommodationProductDiscountValidatorFieldResult
  ) => {
    const groupedBy: OfferValidatorResultSet = {
      hotelUuid: hotelValidatorFieldResult.errors,
      name: nameValidatorFieldResult.errors,
      termsAndConditions: tsAndCsValidatorFieldResult.errors,
      furtherInformation: furtherInformationValidatorFieldResult.errors,
      accommodationProductsPrerequisite: accommodationProductValidatorFieldResult.errors,
      stayBetweenPrerequisite: stayBetweenValidatorFieldResult.errors,
      stepping: steppingValidatorFieldResult.errors,

      accommodationProductDiscount: accommodationProductDiscountValidatorFieldResult.errors,

      // the product discounts, broken up
      fineDiscounts: productDiscountsValidatorFieldResult.errors.filter(e => e.field === 'fineDiscounts'),
      groundServiceDiscounts: productDiscountsValidatorFieldResult.errors.filter(
        e => e.field === 'groundServiceDiscounts'
      ),
      supplementDiscounts: productDiscountsValidatorFieldResult.errors.filter(e => e.field === 'supplementDiscounts'),
      transferDiscounts: productDiscountsValidatorFieldResult.errors.filter(e => e.field === 'transferDiscounts'),

      // sub product discounts, broken up
      extraPersonSupplementDiscounts: epsDiscountsValidatorFieldResult.errors,
      mealPlanDiscounts: subProductDiscountsValidatorFieldResult.errors.filter(e => e.field === 'mealPlanDiscounts'),
    };
    return groupedBy;
  }
);

export const offerHasDetailsValidatorErrorsSelector = createSelector(
  offerHotelValidationSelector,
  offerNameValidationSelector,
  offerTsAndCsValidationSelector,
  offerFurtherInformationValidationSelector,
  (
    hotelValidatorFieldResult,
    nameValidatorFieldResult,
    tsAndCsValidatorFieldResult,
    furtherInformationValidatorFieldResult
  ) => {
    return (
      hotelValidatorFieldResult.errors.length >= 1 ||
      nameValidatorFieldResult.errors.length >= 1 ||
      tsAndCsValidatorFieldResult.errors.length >= 1 ||
      furtherInformationValidatorFieldResult.errors.length >= 1
    );
  }
);

export const offerHasPrerequisitesValidationErrorsSelector = createSelector(
  offerAccommodationProductsPrerequisitesValidationSelector,
  offerStayBetweenPrerequisiteValidationSelector,
  (accommodationProductValidatorFieldResult, stayBetweenValidatorFieldResult) => {
    return (
      accommodationProductValidatorFieldResult.errors.length >= 1 || stayBetweenValidatorFieldResult.errors.length >= 1
    );
  }
);

export const offerHasApplicationsValidationErrorsSelector = createSelector(
  offerSteppingValidationSelector,
  offerExtraPersonSupplementValidationSelector,
  offerProductDiscountsValidationSelector,
  offerSubProductDiscountsValidationSelector,
  accommodationDiscountValidationSelector,
  (
    steppingValidatorResult,
    extraPersonSupplementValidatorResult,
    productDiscountsValidatorResult,
    subProductDiscountsValidatorResult,
    accommodationProductDiscountValidatorResult
  ) => {
    return (
      steppingValidatorResult.errors.length >= 1 ||
      extraPersonSupplementValidatorResult.errors.length >= 1 ||
      productDiscountsValidatorResult.errors.length >= 1 ||
      subProductDiscountsValidatorResult.errors.length >= 1 ||
      accommodationProductDiscountValidatorResult.errors.length >= 1
    );
  }
);

export const offerHasValidationErrorsSelector = createSelector(
  offerHasDetailsValidatorErrorsSelector,
  offerHasPrerequisitesValidationErrorsSelector,
  offerHasApplicationsValidationErrorsSelector,
  (offerHasDetailsErrors, offerHasPrerequisitesErrors, offerHasApplicationsErrors) => {
    return offerHasDetailsErrors || offerHasPrerequisitesErrors || offerHasApplicationsErrors;
  }
);

export const hasProductDiscountsWithProductsSelector = createSelector(
  offerProductDiscountsSelector,
  (productDiscounts) => Object.keys(productDiscounts).reduce((acc, nextType) => {
    const hasProducts = productDiscounts[nextType].reduce((prodAcc, nextProd) => {
      return prodAcc ? prodAcc : Boolean(nextProd?.products?.length > 0);
    }, false);
    
    return acc ? acc : hasProducts;
  }, false)
)

export const hasSubProductDiscountsWithProductsSelector = createSelector(
  offerSubProductDiscountsSelector,
  (productDiscounts) => Object.keys(productDiscounts).reduce((acc, nextType) => {
    const hasProducts = productDiscounts[nextType].reduce((prodAcc, nextProd) => {
      return prodAcc ? prodAcc : Boolean(nextProd?.products?.length > 0);
    }, false);
    
    return acc ? acc : hasProducts;
  }, false)
)

export const hasAccomPreReqsSelector = createSelector(
  offerAccommodationProductPrerequisitesSelector,
  (accomPreReqs) => accomPreReqs.reduce((acc, next)=> {
    return acc ? acc : next.value;
  }, false)
)

export const offerHasPerishableDataSelector = createSelector(
  hasProductDiscountsWithProductsSelector,
  hasSubProductDiscountsWithProductsSelector,
  hasAccomPreReqsSelector,
  (hasProductDiscountsWithProducts, hasSubProductDiscountsWithProducts, hasAccomPreReqs) => {    
    return hasProductDiscountsWithProducts || hasSubProductDiscountsWithProducts || hasAccomPreReqs;
  }
)
