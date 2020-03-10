import { IOfferModel, initialState } from './model';
import {
  OfferAction,
  GET_OFFER_REQUEST,
  GET_OFFER_SUCCESS,
  GET_OFFER_FAILURE,
  SET_OFFER_IS_TEXT_ONLY,
} from './actions';
import {
  OFFER_HOTEL_UUID_CHANGE,
  OFFER_NAME_CHANGE,
  OFFER_TERMS_CHANGE,
  OFFER_FURTHER_INFORMATION_CHANGE,
  OFFER_ADD_STAY_BETWEEN_PREREQUISITE,
  OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE,
  OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE,
  OFFER_SET_BOOLEAN_PREREQUISITE,
  OFFER_SET_PRE_DISCOUNT,
} from './edit/actions';

import {
  offerHotelUuidChangeReducer,
  offerNameChangeReducer,
  offerTermsChangeReducer,
  offerFurtherInformationChangeReducer,
  offerAddStayBetweenPrerequisiteReducer,
  offerChangeStayBetweenPrerequisiteReducer,
  offerRemoveStayBetweenPrerequisiteReducer,
  offerSetBooleanPrerequisitesReducer,
  offerSetPreDiscountReducer,
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
        isTextOnly: action.isTextOnly,
      };

    case GET_OFFER_FAILURE:
      return {
        ...state,
        error: action.error,
        getOfferRequestIsPending: false,
      };

    case SET_OFFER_IS_TEXT_ONLY:
      return {
        ...state,
        isTextOnly: action.value,
      };

    case OFFER_HOTEL_UUID_CHANGE:
      return offerHotelUuidChangeReducer(state, action);
    case OFFER_NAME_CHANGE:
      return offerNameChangeReducer(state, action);
    case OFFER_TERMS_CHANGE:
      return offerTermsChangeReducer(state, action);
    case OFFER_FURTHER_INFORMATION_CHANGE:
      return offerFurtherInformationChangeReducer(state, action);
    case OFFER_ADD_STAY_BETWEEN_PREREQUISITE:
      return offerAddStayBetweenPrerequisiteReducer(state, action);
    case OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE:
      return offerChangeStayBetweenPrerequisiteReducer(state, action);
    case OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE:
      return offerRemoveStayBetweenPrerequisiteReducer(state, action);
    case OFFER_SET_BOOLEAN_PREREQUISITE:
      return offerSetBooleanPrerequisitesReducer(state, action);
    case OFFER_SET_PRE_DISCOUNT:
      return offerSetPreDiscountReducer(state, action);
    default:
      return state;
  }
};
