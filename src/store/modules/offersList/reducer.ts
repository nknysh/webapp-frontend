import * as Actions from './actions';
import { initialState, IOffersListDomain } from './model';
import * as R from 'ramda';
import produce from 'immer';

const offersListReducer = (
  state: IOffersListDomain = initialState,
  action: Actions.OffersListAction
): IOffersListDomain => {
  switch (action.type) {
    case Actions.GET_OFFERS_LIST_REQUEST:
      return {
        ...state,
        requestPending: true,
        totalResults: 0,
        offers: null,
      };

    case Actions.GET_OFFERS_LIST_SUCCESS:
      return {
        ...state,
        requestPending: false,
        totalResults: action.totalResults,
        offers: action.offers,
        error: null,
      };

    case Actions.GET_OFFERS_LIST_FAILURE:
      return {
        ...state,
        requestPending: false,
        error: action.error,
      };

    case Actions.SET_FILTER:
      return {
        ...state,
        currentPage: 0,
        filter: action.filter,
      };

    case Actions.SET_PAGE_NUMBER:
      return {
        ...state,
        currentPage: action.pageNumber,
      };

    case Actions.SET_SORT:
      return {
        ...state,
        sortBy: action.sortBy,
        sortOrder: action.sortOrder,
      };
    case Actions.SET_TRAVEL_AGENT_UUID:
      return {
        ...state,
        travelAgentUuid: action.travelAgentUuid,
      };

    case Actions.ADD_OFFER_UUID_TO_BULK_ACTION_SELECTED_UUIDS:
      return {
        ...state,
        bulkActionSelectedUuids: [...state.bulkActionSelectedUuids, action.offerUuid],
      };

    case Actions.REMOVE_OFFER_UUID_FROM_BULK_ACTION_SELECTED_UUIDS:
      return produce(state, draftState => {
        draftState.bulkActionSelectedUuids = R.without([action.offerUuid], draftState.bulkActionSelectedUuids);
        draftState.bulkActionSelectedUuids = R.uniq(draftState.bulkActionSelectedUuids);
        return draftState;
      });

    case Actions.TOGGLE_IS_BULK_DELETE_CONFIRM_OPEN:
      return {
        ...state,
        isBulkDeleteConfirmOpen: !state.isBulkDeleteConfirmOpen,
      };

    case Actions.OFFERS_DELETE_SUCCESS:
      return {
        ...state,
        isBulkDeleteConfirmOpen: false,
      };

    case Actions.OFFERS_DELETE_FAIL:
      return {
        ...state,
        error: action.error,
        isBulkDeleteConfirmOpen: false,
      };

    case Actions.DISMISS_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default offersListReducer;
