import { IOfferUiState, initialState, ECombinationMode } from '../../model';
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
  POST_OFFERS_ORDER_REQUEST,
  POST_OFFERS_ORDER_SUCCESS,
  POST_OFFERS_ORDER_FAILURE,
  SET_COMBINATION_MODE,
  TOGGLE_OFFER_IN_COMBINATION_LIST,
  SET_ORDERED_OFFERS_LIST,
  SET_OFFER_IS_PRISTINE,
  OFFER_HOTEL_UUID_CHANGE_SUCCESS
} from '../../actions';
import {
  SET_OFFER_IS_TEXT_ONLY,
  TOGGLE_TA_COUNTRY_ACCORDIAN,
  TOGGEL_AGE_NAME_ACCORDIAN_KEY,
} from './actions';
import { PUT_OFFER_FAILURE } from '../../actions';
import produce from 'immer';
import * as R from 'ramda';
import { getOrderedOffers, toOrderedOffer } from '../../utils';

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
      return produce(state, draftState => {
        draftState.getOfferRequestIsPending = false;
        draftState.getError = null;
        draftState.isTextOnly = action.isTextOnly;

        if (action.offer.combines && action.offer.combinesWith) {
          if (action.offer.combinesWith.length >= 1) {
            draftState.combinationMode = ECombinationMode.COMBINES_WITH_LIST;
            draftState.combinationOfferUuids = action.offer.combinesWith;
          } else if (action.offer.cannotCombineWith.length >= 1) {
            draftState.combinationMode = ECombinationMode.CANNOT_COMBINE_WITH_LIST;
            draftState.combinationOfferUuids = action.offer.cannotCombineWith;
          } else {
            draftState.combinationMode = ECombinationMode.COMBINES_WITH_ANY;
          }
        } else {
          draftState.combinationMode = ECombinationMode.COMBINES_WITH_NONE;
        }

        if(action.offersOnHotel){
          draftState.orderedOffersList = getOrderedOffers(action.offersOnHotel);
        }

        return draftState;
      });

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
        postError: null
      };

    case POST_OFFER_FAILURE:
      return {
        ...state,
        postOfferRequestIsPending: false,
        postError: action.errors,
      };

    // ----------- POST_OFFERS_ORDER ----------------------

    case POST_OFFERS_ORDER_REQUEST:
      return {
        ...state,
        postOffersOrderRequestIsPending: true
      };
    
    case POST_OFFERS_ORDER_SUCCESS:
      return {
        ...state,
        postOffersOrderRequestIsPending: false,
        postOffersOrderError: null,
        orderedOffersList: getOrderedOffers(action.offersOnHotel)
      };

    case POST_OFFERS_ORDER_FAILURE:
      return {
        ...state,
        postOffersOrderRequestIsPending: false,
        postOffersOrderError: action.errors,
      };

    case SET_OFFER_IS_TEXT_ONLY:
      return {
        ...state,
        isTextOnly: action.value,
      };

    case TOGGLE_TA_COUNTRY_ACCORDIAN:
      return {
        ...state,
        taCountryAccordianKeys: state.taCountryAccordianKeys.includes(action.key)
          ? state.taCountryAccordianKeys.filter(k => k !== action.key)
          : [...state.taCountryAccordianKeys, action.key],
      };

    case TOGGEL_AGE_NAME_ACCORDIAN_KEY:
      return {
        ...state,
        ageNameAccordianKeys: state.ageNameAccordianKeys.includes(action.ageNamekey)
          ? state.ageNameAccordianKeys.filter(k => k !== action.ageNamekey)
          : [...state.ageNameAccordianKeys, action.ageNamekey],
      };

    case SET_COMBINATION_MODE:
      return {
        ...state,
        combinationMode: action.combinationMode,
      };

    case TOGGLE_OFFER_IN_COMBINATION_LIST:
      return produce(state, draftState => {
        if (action.isChecked === true) {
          draftState.combinationOfferUuids.push(action.offerUuid);
        } else if (action.isChecked === false) {
          draftState.combinationOfferUuids = draftState.combinationOfferUuids.filter(cc => cc !== action.offerUuid);
        }
        draftState.combinationOfferUuids = R.uniq(draftState.combinationOfferUuids);
        return draftState;
      });

    case SET_ORDERED_OFFERS_LIST:
      return {
        ...state,
        orderedOffersList: action.list,
      };

    case SET_OFFER_IS_PRISTINE:
      return {
        ...state,
        isPristine: action.value,
      };

    case OFFER_HOTEL_UUID_CHANGE_SUCCESS:
      return {
        ...state,
        orderedOffersList: [
          ...getOrderedOffers(action.data.offers),
          toOrderedOffer(initialState.offer)
        ]
      };
    
    default:
      return state;
  }
};
