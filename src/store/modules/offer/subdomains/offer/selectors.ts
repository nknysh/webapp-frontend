import { createSelector } from 'reselect';
import { generateArrayOfDatesBetween } from 'utils';
import {
  IOfferPrerequisitesPayload,
  IOfferProductDiscountInstance,
  IOfferUI,
  IOfferStepping,
} from 'services/BackendApi';
import {
  getBootstrapCountriesSelector,
  getBootstrapExtraPersonSupplementProductSelector,
} from '../../../bootstrap/selectors';
import { groupBy, flatten, uniq } from 'ramda';
import { ITaCountriesUiData as IOfferTaCountriesPreRequisiteUi } from '../../types';
import { returnObjectWithUndefinedsAsEmptyStrings } from '../../utils';
import {
  offerDomainSelector,
  getAccommodationProductsForHotelSelector as hotelAccomodationProductsSelector,
} from '../../domainSelectors';
import { IAgeName, IUIOfferProductDiscountInstance } from '../../../../../services/BackendApi/types/OfferResponse';
import { Validator, ValidatorFieldResult, OfferValidatorResultSet, ValidatorFieldError } from '../../validation';
import { uiStateSelector } from '../uiState/selectors';

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
  getBootstrapCountriesSelector,
  (prerequisiteCountries, countries) => {
    if (prerequisiteCountries.length === countries.length || prerequisiteCountries.length <= 0) {
      return 'All Countries';
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
  hotelAccomodationProductsSelector,
  (accommodationProductPrerequisites, accommodationProductsOnHotel) =>
    Boolean(
      accommodationProductPrerequisites.length === accommodationProductsOnHotel?.length ||
        accommodationProductPrerequisites.length <= 0
    )
);

export const offerAccommodationProductPrerequisitesLabelSelector = createSelector(
  offerAccommodationProductPrerequisitesRawSelector,
  isAccomodationPreReqAllSelected,
  (accommodationProductPrerequisites, isAll) => {
    return isAll ? 'All Accommodation Products' : `${accommodationProductPrerequisites.length} Accommodation Products`;
  }
);

export const accomodationPreRequisiteAgeNamesSelector = createSelector(
  offerAccommodationProductPrerequisitesSelector,
  accomProducts => {
    // Get a unqiue map of age names with age ranges
    const ageNamesMap: IAgeNamesMap = accomProducts
      .map(ap => ap.ageNames)
      .reduce((acc, next) => [...acc, ...next], [])
      .reduce((acc, next) => {
        acc[next.name] = {
          ageFrom: next.ageFrom,
          ageTo: next.ageTo,
        };
        return acc;
      }, {});

    // Figure out wherre the adult age starts
    const oldestAge = Object.keys(ageNamesMap).reduce((acc, key) => {
      return ageNamesMap[key].ageTo! > acc ? ageNamesMap[key].ageTo : acc;
    }, 0);

    // Populate the rest of the results
    return Object.keys(ageNamesMap)
      .reduce((acc, key) => {
        return [
          ...acc,
          {
            name: key,
            ageFrom: ageNamesMap[key].ageFrom,
            ageTo: ageNamesMap[key].ageTo,
          },
        ];
      }, [])
      .sort((a, b) => b.ageFrom! - a.ageFrom!);
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
  return offer.subProductDiscounts;
});

export interface IUIOfferProductDiscountInstanceWithAgeNames extends IUIOfferProductDiscountInstance {
  ageNames: (string | undefined)[];
}

export const offerSubProductDiscountsSupplementsSelector = createSelector(
  offerSubProductDiscountsSelector,
  (subProductDiscounts): IUIOfferProductDiscountInstanceWithAgeNames[] => {
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
  offerSubProductDiscountsSupplementsSelector,
  getBootstrapExtraPersonSupplementProductSelector,
  (supplements, extraPersonSupplementProduct): IUIOfferProductDiscountInstanceWithAgeNames[] => {
    return supplements.filter(sup => {
      return sup.products.some(p => {
        return p.uuid === extraPersonSupplementProduct.uuid;
      });
    });
  }
);

export const offerProductDiscountsSelector = createSelector(offerSelector, offer => {
  return offer.productDiscounts;
});

export const offerProductDiscountsFinesSelector = createSelector(offerProductDiscountsSelector, productDiscounts => {
  if (!productDiscounts || !productDiscounts.Fine) {
    return [];
  }
  return productDiscounts.Fine;
});

export const offerProductDiscountsGroundServicesSelector = createSelector(
  offerProductDiscountsSelector,
  productDiscounts => {
    if (!productDiscounts || !productDiscounts['Ground Service']) {
      return [];
    }
    return productDiscounts['Ground Service'];
  }
);

export const offerSubProductDiscountsMealPlansSelector = createSelector(
  offerSubProductDiscountsSelector,
  subProductDiscounts => {
    if (!subProductDiscounts || !subProductDiscounts['Meal Plan']) {
      return [];
    }
    return subProductDiscounts['Meal Plan'];
  }
);

export const offerProductDiscountsTransfersSelector = createSelector(
  offerProductDiscountsSelector,
  productDiscounts => {
    if (!productDiscounts || !productDiscounts.Transfer) {
      return [];
    }
    return productDiscounts.Transfer;
  }
);

export const offerProductDiscountsSupplementsSelector = createSelector(
  offerProductDiscountsSelector,
  productDiscounts => {
    if (!productDiscounts || !productDiscounts.Supplement) {
      return [];
    }
    return productDiscounts.Supplement;
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

    if (productDiscounts !== undefined) {
      if (productDiscounts.Fine) {
        productDiscounts.Fine.forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'fineDiscounts',
              index,
              message: `Fine discount #${index + 1} - discount percentage is required`,
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

    if (subProductDiscounts !== undefined) {
      if (subProductDiscounts['Meal Plan']) {
        subProductDiscounts['Meal Plan'].forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'mealPlanDiscounts',
              index,
              message: `Meal Plan discount #${index + 1} - discount percentage is required`,
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

    extraPersonSupplementsDiscounts.forEach((epsDiscount, index) => {
      if (epsDiscount.discountPercentage === undefined || epsDiscount.discountPercentage === '') {
        errors.push({
          field: 'extraPersonSupplementDiscounts',
          index,
          message: `Extra Person Supplement discount #${index + 1} - discount percentage is required`,
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
    epsDiscountsValidatorFieldResult
  ) => {
    const groupedBy: OfferValidatorResultSet = {
      hotelUuid: hotelValidatorFieldResult.errors,
      name: nameValidatorFieldResult.errors,
      termsAndConditions: tsAndCsValidatorFieldResult.errors,
      furtherInformation: furtherInformationValidatorFieldResult.errors,
      accommodationProductsPrerequisite: accommodationProductValidatorFieldResult.errors,
      stayBetweenPrerequisite: stayBetweenValidatorFieldResult.errors,
      stepping: steppingValidatorFieldResult.errors,

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
  (
    steppingValidatorResult,
    extraPersonSupplementValidatorResult,
    productDiscountsValidatorResult,
    subProductDiscountsValidatorResult
  ) => {
    return (
      steppingValidatorResult.errors.length >= 1 ||
      extraPersonSupplementValidatorResult.errors.length >= 1 ||
      productDiscountsValidatorResult.errors.length >= 1 ||
      subProductDiscountsValidatorResult.errors.length >= 1
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
