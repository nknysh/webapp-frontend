import { IOfferModel, initialState } from './model';
import { OfferAction, GET_OFFER_REQUEST, GET_OFFER_SUCCESS, GET_OFFER_FAILURE } from './actions';
import {
  EDIT_OFFER_HOTEL_UUID_CHANGE,
  EDIT_OFFER_NAME_CHANGE,
  EDIT_OFFER_TERMS_CHANGE,
  EDIT_OFFER_FURTHER_INFORMATION_CHANGE,
  EDIT_OFFER_ADD_STAY_BETWEEN_PREREQUISITE,
} from './edit/actions';

import {
  editOfferHotelUuidReducer,
  editOfferNameReducer,
  editOfferTermsReducer,
  editOfferFurtherInformationReducer,
  editOfferAddStayBetweenPrerequisiteReducer,
} from './edit/reducer';

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
        associatedOffersMapping: action.associatedOffersMapping,
        associatedProductsMapping: action.associatedProductsMapping,
        offersOnHotel: action.offersOnHotel,
        error: null,
      };

    case GET_OFFER_FAILURE:
      return {
        ...state,
        error: action.error,
        getOfferRequestIsPending: false,
      };

    case EDIT_OFFER_HOTEL_UUID_CHANGE:
      return editOfferHotelUuidReducer(state, action);
    case EDIT_OFFER_NAME_CHANGE:
      return editOfferNameReducer(state, action);
    case EDIT_OFFER_TERMS_CHANGE:
      return editOfferTermsReducer(state, action);
    case EDIT_OFFER_FURTHER_INFORMATION_CHANGE:
      return editOfferFurtherInformationReducer(state, action);
    case EDIT_OFFER_ADD_STAY_BETWEEN_PREREQUISITE:
      return editOfferAddStayBetweenPrerequisiteReducer(state, action);

    default:
      return state;
  }
};
