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

export const offerStayBetweenPrerequisitesSelector = createSelector(
  offerSelector,
  offer => {
    return offer.prerequisites.dates.map(dateRange => {
      return generateArrayOfDatesBetween(dateRange.startDate, dateRange.endDate);
    });
  }
);

export const offerBooleanPrerequisitesSelector = createSelector(
  offerSelector,
  offer => {

    // we check for undefined below, as they wont exist in the store
    return {
      anniversary: offer.prerequisites.payload?.anniversary !== undefined ? offer.prerequisites.payload?.anniversary : null,
      birthday: offer.prerequisites.payload?.birthday !== undefined ? offer.prerequisites.payload?.birthday : null,
      honeymoon: offer.prerequisites.payload?.honeymoon !== undefined ? offer.prerequisites.payload?.honeymoon : null,
      repeatCustomer: offer.prerequisites.payload?.repeatCustomer !== undefined ? offer.prerequisites.payload?.repeatCustomer : null,
      wedding: offer.prerequisites.payload?.wedding !== undefined ? offer.prerequisites.payload?.wedding : null,
    } as IOfferPrerequisitesPayload;
  }
);
