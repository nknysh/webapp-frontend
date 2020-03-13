import { createSelector } from 'reselect';
import { generateArrayOfDatesBetween } from 'utils';
import { IOfferPrerequisitesPayload } from 'services/BackendApi';
import { IOfferModel } from '../../model';
import { getBootstrapCountriesSelector } from '../../../bootstrap/selectors';

// TODO: For some reason, I can't import the offerDomainSelector from
// the root selector file. This is a tmp fix. I guess there's some minconfiguration
// in webpack or babel?
const tmpOfferDomainSelector = (state: any): IOfferModel => state.offer;
const tmpGetAccommodationProductsForHotelSelector = createSelector(
  tmpOfferDomainSelector,
  domain => domain.accommodationProductsForHotel
);
export const offerSelector = createSelector(
  tmpOfferDomainSelector,
  domain => domain.offer
);

export const offerNameSelector = createSelector(
  offerSelector,
  offer => offer.name
);

export const offerHotelUuidSelector = createSelector(
  offerSelector,
  offer => offer.hotelUuid
);

export const offerTermsSelector = createSelector(
  offerSelector,
  offer => offer.termsAndConditions
);

export const offerFurtherInformationSelector = createSelector(
  offerSelector,
  offer => offer.furtherInformation
);

export const offerPrerequisitesSelector = createSelector(
  offerSelector,
  offer => offer.prerequisites
);

export const offerPayloadPrerequisitesSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.payload
);

export const offerStayBetweenPrerequisitesSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => {
    return prerequisites.dates.map(dateRange => {
      if (!dateRange.startDate || dateRange.startDate === '') {
        return [];
      }
      if (!dateRange.endDate || dateRange.endDate === '') {
        return [dateRange.startDate];
      }
      return generateArrayOfDatesBetween(dateRange.startDate, dateRange.endDate);
    });
  }
);

export const offerStayBetweenPrerequisitesRawSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.dates
);

export const offerBooleanPrerequisitesSelector = createSelector(
  offerPayloadPrerequisitesSelector,
  payload => {
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

export const offerPreDiscountSelector = createSelector(
  offerSelector,
  offer => offer.preDiscount
);

export const offerCountryCodePrerequisiteSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => {
    return prerequisites.countryCodes;
  }
);

export const offerTaCountriesPrerequisiteSelector = createSelector(
  offerCountryCodePrerequisiteSelector,
  getBootstrapCountriesSelector,
  (prerequisiteCountries, countries) => {
    return countries.map(country => {
      if (prerequisiteCountries.includes(country.code)) {
        return {
          label: country.name,
          value: true,
        };
      } else {
        return {
          label: country.name,
          value: false,
        };
      }
    });
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
  prerequisites => prerequisites.accommodationProducts
);

export const offerAccommodationProductPrerequisitesSelector = createSelector(
  offerAccommodationProductPrerequisitesRawSelector,
  tmpGetAccommodationProductsForHotelSelector,
  (accommodationProductPrerequisites, accommodationProductsOnHotel) => {
    return accommodationProductsOnHotel.map(accommodationProduct => {
      if (accommodationProductPrerequisites.includes(accommodationProduct.uuid)) {
        return {
          label: accommodationProduct.name,
          value: true,
        };
      } else {
        return {
          label: accommodationProduct.name,
          value: false,
        };
      }
    });
  }
);

export const offerAccommodationProductPrerequisitesLabelSelector = createSelector(
  offerAccommodationProductPrerequisitesRawSelector,
  tmpGetAccommodationProductsForHotelSelector,
  (accommodationProductPrerequisites, accommodationProductsOnHotel) => {
    if (
      accommodationProductPrerequisites.length === accommodationProductsOnHotel.length ||
      accommodationProductPrerequisites.length <= 0
    ) {
      return 'All Accommodation Products';
    } else {
      return `${accommodationProductPrerequisites.length} Accommodation Products`;
    }
  }
);

export const offerAdvancePrerequisiteSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.advance
);

export const offerMaxLodgingsPrerequisiteSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.maximumLodgingsInBooking
);
