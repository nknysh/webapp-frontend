import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';
import { USERS_FETCH } from './actions';

export default createReducer(
  {
    [USERS_FETCH]: loadingReducer,
    [getSuccessActionName(USERS_FETCH)]: successReducer,
    [getErrorActionName(USERS_FETCH)]: errorReducer,
  },
  initialState
);
