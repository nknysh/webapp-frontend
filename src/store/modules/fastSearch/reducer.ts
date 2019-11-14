import { FastSearchDomain, initialState } from './model';
import * as Actions from './actions';

export default function fastSearchReducer(
  state: FastSearchDomain = initialState,
  action: Actions.FastSearchAction
): FastSearchDomain {
  switch (action.type) {
    // ------------------------------------------------------
    // Search Options
    // ------------------------------------------------------
    case Actions.OPTIONS_REQUEST:
      return {
        ...state,
        optionsRequestPending: true,
      };

    case Actions.OPTIONS_SUCCESS:
      console.log('OPTIONS_SUCCESS', action);
      return {
        ...state,
        options: action.successResponse,
        optionsRequestPending: false,
      };

    case Actions.OPTIONS_FAILURE:
      return {
        ...state,
        optionsRequestError: action.errorResponse,
        offersRequestPending: false,
      };

    // ------------------------------------------------------
    // Offers Search
    // ------------------------------------------------------
    case Actions.OFFERS_SEARCH_REQUEST:
      return {
        ...state,
        offersRequestPending: true,
      };

    case Actions.OFFERS_SEARCH_SUCCESS:
      return {
        ...state,
        results: action.successResponse.data.hotels,
        offersRequestPending: false,
      };

    case Actions.OFFERS_SEARCH_FAILURE:
      return {
        ...state,
        offersRequestError: action.errorResponse,
        offersRequestPending: false,
      };

    default:
      return state;
  }
}
