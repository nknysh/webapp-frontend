import { IOfferModel, initialState } from './model';
import { OfferDomainAction, GET_OFFER_SUCCESS } from './actions';

import { offerReducer } from './subdomains/offer/reducer';
import { uiStateReducer } from './subdomains/uiState/reducer';

export const offer = (state: IOfferModel = initialState, action: OfferDomainAction): IOfferModel => {
  return {
    uiState: uiStateReducer(state.uiState, action),
    offer: offerReducer(state.offer, action),
    associatedOffersMapping: associatedOffersMappingReducer(state.associatedOffersMapping, action),
    associatedProductsMapping: associatedProductsMappingReducer(state.associatedProductsMapping, action),
    offersOnHotel: offersOnHotelReducer(state.offersOnHotel, action),
  };
};

// Stub reducers
const associatedOffersMappingReducer = (
  state: any = initialState.associatedOffersMapping,
  action: OfferDomainAction
): any => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return action.associatedOffersMapping;
    default:
      return state;
  }
};

const associatedProductsMappingReducer = (
  state: any = initialState.associatedProductsMapping,
  action: OfferDomainAction
): any => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return action.associatedProductsMapping;
    default:
      return state;
  }
};

const offersOnHotelReducer = (state: any = initialState.offersOnHotel, action: OfferDomainAction): any => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return action.offersOnHotel;
    default:
      return state;
  }
};
