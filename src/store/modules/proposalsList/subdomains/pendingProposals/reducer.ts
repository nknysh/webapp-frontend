import { initialState, IPendingProposalsSubdomain } from '../../model';
import * as Actions from './actions';

export const pendingProposalsReducer = (
  state: IPendingProposalsSubdomain = initialState.pendingProposals,
  action: Actions.PendingProposalsAction
): IPendingProposalsSubdomain => {
  switch (action.type) {

    case Actions.GET_PENDING_PROPOSALS_INFO_REQUEST:
      return {
        ...state,
        requestPending: true
      };
    
    case Actions.GET_PENDING_PROPOSALS_INFO_SUCCESS:
      return {
        ...state,
        requestPending: false,
        error: null,
        count: action.count,
        latest: action.latest || null
      };

    case Actions.GET_PENDING_PROPOSALS_INFO_FAILURE:
      return {
        ...state,
        requestPending: false,
        error: action.error
      };
    
    default:
      return state;
  }
};
