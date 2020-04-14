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

export const getOffersOnHotelSelector = createSelector(offerDomainSelector, domain => domain.offersOnHotel);

export const getAccommodationProductsForHotelSelector = createSelector(
  offerDomainSelector,
  domain => domain.accomodationProductsForHotel || []
);

export const availableProductsSelector = createSelector(offerDomainSelector, domain => domain.availableProducts);
export const availableAccommodationProductsSelector = createSelector(
  availableProductsSelector,
  availableProducts => availableProducts.accommodationProducts
);
export const availableFineProductsSelector = createSelector(
  availableProductsSelector,
  availableProducts => availableProducts.fineProducts
);
export const availableTransferProductsSelector = createSelector(
  availableProductsSelector,
  availableProducts => availableProducts.transferProducts
);
export const availableGroundServiceProductsSelector = createSelector(
  availableProductsSelector,
  availableProducts => availableProducts.groundServiceProducts
);
export const availableMealPlanProductsSelector = createSelector(
  availableProductsSelector,
  availableProducts => availableProducts.mealPlanProducts
);
export const availableSupplementProductsSelector = createSelector(
  availableProductsSelector,
  availableProducts => availableProducts.supplementProducts
);
