import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';
import { TRAVEL_AGENTS_FETCH } from './actions';

export default createReducer(
  {
    [TRAVEL_AGENTS_FETCH]: loadingReducer,
    [getSuccessActionName(TRAVEL_AGENTS_FETCH)]: successReducer,
    [getErrorActionName(TRAVEL_AGENTS_FETCH)]: errorReducer,
  },
  initialState
);
