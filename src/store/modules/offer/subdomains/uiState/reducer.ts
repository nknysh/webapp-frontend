import { IOfferUiState, initialState } from '../../model';
import { OfferDomainAction, GET_OFFER_REQUEST, GET_OFFER_SUCCESS, GET_OFFER_FAILURE } from '../../actions';
import { SET_OFFER_IS_TEXT_ONLY } from './actions';

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

    default:
      return state;
  }
};
