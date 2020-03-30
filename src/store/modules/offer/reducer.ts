import { IOfferModel, initialState } from './model';
import { OfferDomainAction, GET_OFFER_SUCCESS, RESET_OFFER_MODULE, OFFER_HOTEL_UUID_CHANGE_SUCCESS } from './actions';

import { offerReducer } from './subdomains/offer/reducer';
import { uiStateReducer } from './subdomains/uiState/reducer';

export const offer = (state: IOfferModel = initialState, action: OfferDomainAction): IOfferModel => {
  if (action.type === RESET_OFFER_MODULE) {
    return initialState;
  }

  return {
    uiState: uiStateReducer(state.uiState, action),
    offer: offerReducer(state.offer, action),
    associatedOffersMapping: associatedOffersMappingReducer(state.associatedOffersMapping, action),
    associatedProductsMapping: associatedProductsMappingReducer(state.associatedProductsMapping, action),
    offersOnHotel: offersOnHotelReducer(state.offersOnHotel, action),
    accommodationProductsForHotel: accommodationProductsForHotelReducer(state.accommodationProductsForHotel, action),
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

export const associatedProductsMappingReducer = (
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

export const offersOnHotelReducer = (state: any = initialState.offersOnHotel, action: OfferDomainAction): any => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return action.offersOnHotel;
    default:
      return state;
  }
};

export const accommodationProductsForHotelReducer = (
  state: any = initialState.accommodationProductsForHotel,
  action: OfferDomainAction
): any => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return action.accommodationProductsForHotel;
    case OFFER_HOTEL_UUID_CHANGE_SUCCESS:
      return action.data.accommodationProducts;
    default:
      return state;
  }
};
