import { IOfferModel, initialState } from './model';
import { OfferAction, GET_OFFER_REQUEST, GET_OFFER_SUCCESS, GET_OFFER_FAILURE } from './actions';

export const offer = (state: IOfferModel = initialState, action: OfferAction): IOfferModel => {
  switch (action.type) {
    case GET_OFFER_REQUEST:
      return {
        ...state,
        getOfferRequestIsPending: true,
      };

    case GET_OFFER_SUCCESS:
      return {
        ...state,
        getOfferRequestIsPending: false,
        offer: action.offer,
        error: null,
      };

    case GET_OFFER_FAILURE:
      return {
        ...state,
        error: action.error,
        getOfferRequestIsPending: false,
      };

    default:
      return state;
  }
};
