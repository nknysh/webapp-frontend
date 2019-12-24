import * as Actions from './actions';
import { initialState, IProposalsListDomain } from './model';

const proposalListReducer = (
  state: IProposalsListDomain = initialState,
  action: Actions.ProposalsListAction
): IProposalsListDomain => {
  switch (action.type) {
    case Actions.GET_PROPOSAL_LIST_REQUEST:
      return {
        ...state,
        requestPending: true,
        totalResults: 0,
        proposals: null,
      };

    case Actions.GET_PROPOSAL_LIST_SUCCESS:
      return {
        ...state,
        requestPending: false,
        totalResults: action.totalResults,
        proposals: action.proposals,
        error: null,
      };

    case Actions.GET_PROPOSAL_LIST_FAILURE:
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

    default:
      return state;
  }
};

export default proposalListReducer;
