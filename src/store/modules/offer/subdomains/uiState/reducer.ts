import { IOfferUiState, initialState } from '../../model';
import {
  OfferDomainAction,
  GET_OFFER_REQUEST,
  GET_OFFER_SUCCESS,
  GET_OFFER_FAILURE,
  PUT_OFFER_REQUEST,
  PUT_OFFER_SUCCESS,
  POST_OFFER_REQUEST,
  POST_OFFER_SUCCESS,
  POST_OFFER_FAILURE,
} from '../../actions';
import { SET_OFFER_IS_TEXT_ONLY, TOGGLE_TA_COUNTRY_ACCORDIAN } from './actions';
import { PUT_OFFER_FAILURE } from '../../actions';
import { ifElse, contains, without, append } from 'ramda';

export const uiStateReducer = (
  state: IOfferUiState = initialState.uiState,
  action: OfferDomainAction
): IOfferUiState => {
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
        getError: null,
        isTextOnly: action.isTextOnly,
      };

    case GET_OFFER_FAILURE:
      return {
        ...state,
        getError: action.error,
        getOfferRequestIsPending: false,
      };

    case PUT_OFFER_REQUEST:
      return {
        ...state,
        putOfferRequestIsPending: true,
      };

    case PUT_OFFER_SUCCESS:
      return {
        ...state,
        putOfferRequestIsPending: false,
        putError: null,
      };

    case PUT_OFFER_FAILURE:
      return {
        ...state,
        putOfferRequestIsPending: false,
        putError: action.errors,
      };

    case POST_OFFER_REQUEST:
      return {
        ...state,
        postOfferRequestIsPending: true,
      };

    case POST_OFFER_SUCCESS:
      return {
        ...state,
        postOfferRequestIsPending: false,
        postError: null,
      };

    case POST_OFFER_FAILURE:
      return {
        ...state,
        postOfferRequestIsPending: false,
        postError: action.errors,
      };

    case SET_OFFER_IS_TEXT_ONLY:
      return {
        ...state,
        isTextOnly: action.value,
      };

    case TOGGLE_TA_COUNTRY_ACCORDIAN:
      return {
        ...state,
        taCountryAccordianKeys: ifElse(contains(action.key), without([action.key]), append(action.key))(
          state.taCountryAccordianKeys
        ),
      };

    default:
      return state;
  }
};
