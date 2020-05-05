import * as Actions from './actions';
import { initialState } from '../../model';
import { pendingProposalsReducer as reducer } from './reducer';

describe('Pending Proposals reducer', () => {
  const pendingProposalsInitialState = initialState.pendingProposals;

  it('handles GET_PENDING_PROPOSALS_INFO_REQUEST correctly', () => {
    const action = Actions.getPendingProposalsInfoRequestAction()
    const result = reducer(pendingProposalsInitialState, action);
    
    const expected = {
      ...pendingProposalsInitialState,
      requestPending: true
    };

    expect(result).toEqual(expected);
  });

  it('handles GET_PENDING_PROPOSALS_INFO_SUCCESS correctly', () => {
    const count = 3;
    const action = Actions.getPendingProposalsInfoSuccessAction(count)
    const result = reducer(pendingProposalsInitialState, action);
    
    const expected = {
      ...pendingProposalsInitialState,
      count
    };

    expect(result).toEqual(expected);
  });

  it('handles GET_PENDING_PROPOSALS_INFO_FAILURE correctly', () => {
    const error = 'Unknown Error';
    const action = Actions.getPendingProposalsInfoFailureAction(error);
    const result = reducer(pendingProposalsInitialState, action);
    
    const expected = {
      ...pendingProposalsInitialState,
      error
    };

    expect(result).toEqual(expected);
  });

});