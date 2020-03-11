import { IOfferModel } from './model';
import { createSelector } from 'reselect';
import { generateArrayOfDatesBetween } from 'utils';
import { IOfferPrerequisitesPayload } from 'services/BackendApi';

export const offerDomainSelector = (state: any): IOfferModel => state.offer as IOfferModel;

export const getOfferRequestIsPendingSelector = createSelector(
  offerDomainSelector,
  domain => domain.getOfferRequestIsPending
);

export const offerErrorSelector = createSelector(
  offerDomainSelector,
  domain => domain.error
);

export const offerSelector = createSelector(
  offerDomainSelector,
  domain => domain.offer
);

export const getAssociatedOffersMappingSelector = createSelector(
  offerDomainSelector,
  domain => domain.associatedOffersMapping
);

export const getAssociatedProductsMappingSelector = createSelector(
  offerDomainSelector,
  domain => domain.associatedProductsMapping
);

export const getOffersOnHotelSelector = createSelector(
  offerDomainSelector,
  domain => domain.offersOnHotel
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

export const offerDomainIsTextOnlySelector = createSelector(
  offerDomainSelector,
  domain => domain.isTextOnly
);
