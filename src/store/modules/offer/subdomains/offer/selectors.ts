import { createSelector } from 'reselect';
import { generateArrayOfDatesBetween } from 'utils';
import { IOfferPrerequisitesPayload, IOfferProductDiscountInstance, IOfferStepping } from 'services/BackendApi';
import {
  getBootstrapCountriesSelector,
  getBootstrapExtraPersonSupplementProductSelector,
} from '../../../bootstrap/selectors';
import { groupBy, flatten, uniq } from 'ramda';
import { ITaCountriesUiData as IOfferTaCountriesPreRequisiteUi } from '../../types';
import {
  offerDomainSelector,
  getAccommodationProductsForHotelSelector as hotelAccomodationProductsSelector,
  availableGroundServiceProductsSelector,
  availableMealPlanProductsSelector,
  availableTransferProductsSelector,
  availableSupplementProductsSelector,
  availableFineProductsSelector,
} from '../../domainSelectors';
import { IAgeName, IUIOfferProductDiscountInstance } from '../../../../../services/BackendApi/types/OfferResponse';
import { returnObjectWithUndefinedsAsEmptyStrings, discountsWithCategory } from '../../utils';

export interface IAccomodationProductPreRequisiteUi {
  label: string;
  uuid: string;
  value: boolean;
  ageNames: IAgeName[];
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
  prerequisiteCountries => {
    const countryPluralised = prerequisiteCountries.length === 1 ? 'Country' : 'Countries';

    return prerequisiteCountries.length < 1
      ? 'Applies to Any Country'
      : `Applies to ${prerequisiteCountries.length} ${countryPluralised}`;
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
  accommodationProductPrerequisites => Boolean(accommodationProductPrerequisites.length < 1)
);

export const offerAccommodationProductPrerequisitesLabelSelector = createSelector(
  offerAccommodationProductPrerequisitesRawSelector,
  isAccomodationPreReqAllSelected,
  (accommodationProductPrerequisites, isAll) => {
    const productPluralised = accommodationProductPrerequisites.length === 1 ? 'Product' : 'Products';
    return isAll
      ? 'Applies To Any Accommodation Product'
      : `Applies to ${accommodationProductPrerequisites.length} Accommodation ${productPluralised}`;
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
      }, {});

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
    return supplements
      .filter(sup => {
        return sup.products.some(p => {
          return p.uuid === extraPersonSupplementProduct.uuid;
        });
      })
      .map(sup => ({
        ...sup,
        ageNames: sup.ageNames?.filter(an => an),
      }));
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
  }
);

export const offerProductDiscountsGroundServicesSelector = createSelector(
  offerProductDiscountsSelector,
  availableGroundServiceProductsSelector,
  (productDiscounts, availableProducts): IUIOfferProductDiscountInstance[] => {
    if (!productDiscounts || !productDiscounts['Ground Service']) {
      return [];
    }
    return productDiscounts['Ground Service']
      ? discountsWithCategory(productDiscounts['Ground Service'], availableProducts)
      : [];
  }
);

export const offersubProductDiscountsMealPlansSelector = createSelector(
  offerSubProductDiscountsSelector,
  availableMealPlanProductsSelector,
  (subProductDiscounts, availableProducts): IUIOfferProductDiscountInstance[] => {
    if (!subProductDiscounts || !subProductDiscounts['Meal Plan']) {
      return [];
    }

    return subProductDiscounts['Meal Plan']
      ? discountsWithCategory(subProductDiscounts['Meal Plan'], availableProducts)
      : [];
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

export const hasProductDiscountsWithProductsSelector = createSelector(offerProductDiscountsSelector, productDiscounts =>
  Object.keys(productDiscounts).reduce((acc, nextType) => {
    const hasProducts = productDiscounts[nextType].reduce((prodAcc, nextProd) => {
      return prodAcc ? prodAcc : Boolean(nextProd?.products?.length > 0);
    }, false);

    return acc ? acc : hasProducts;
  }, false)
);

export const hasSubProductDiscountsWithProductsSelector = createSelector(
  offerSubProductDiscountsSelector,
  productDiscounts =>
    Object.keys(productDiscounts).reduce((acc, nextType) => {
      const hasProducts = productDiscounts[nextType].reduce((prodAcc, nextProd) => {
        return prodAcc ? prodAcc : Boolean(nextProd?.products?.length > 0);
      }, false);

      return acc ? acc : hasProducts;
    }, false)
);

export const hasAccomPreReqsSelector = createSelector(offerAccommodationProductPrerequisitesSelector, accomPreReqs =>
  accomPreReqs.reduce((acc, next) => {
    return acc ? acc : next.value;
  }, false)
);

export const offerHasPerishableDataSelector = createSelector(
  hasProductDiscountsWithProductsSelector,
  hasSubProductDiscountsWithProductsSelector,
  hasAccomPreReqsSelector,
  (hasProductDiscountsWithProducts, hasSubProductDiscountsWithProducts, hasAccomPreReqs) => {
    return hasProductDiscountsWithProducts || hasSubProductDiscountsWithProducts || hasAccomPreReqs;
  }
);
