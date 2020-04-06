import { IOfferModel } from './model';
import { createSelector } from 'reselect';

export const offerDomainSelector = (state: any): IOfferModel => state.offer as IOfferModel;

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

export const getAccommodationProductsForHotelSelector = createSelector(
  offerDomainSelector,
  domain => domain.accommodationProductsForHotel || []
);
