import { IOfferModel } from './model';
import { createSelector } from 'reselect';

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
  offer => (offer == null ? null : offer.name)
);

export const offerHotelUuidSelector = createSelector(
  offerSelector,
  offer => (offer == null ? null : offer.hotelUuid)
);

export const offerTermsSelector = createSelector(
  offerSelector,
  offer => (offer == null ? null : offer.termsAndConditions)
);

export const offerFurtherInformationSelector = createSelector(
  offerSelector,
  offer => (offer == null ? null : offer.furtherInformation)
);
