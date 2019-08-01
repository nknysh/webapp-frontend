import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';
import { USERS_FETCH, USER_UPDATE } from './actions';

export default createReducer(
  {
    [USERS_FETCH]: loadingReducer,
    [getSuccessActionName(USERS_FETCH)]: successReducer,
    [getErrorActionName(USERS_FETCH)]: errorReducer,
    [USER_UPDATE]: sendingReducer,
    [getSuccessActionName(USER_UPDATE)]: successReducer,
    [getErrorActionName(USER_UPDATE)]: errorReducer,
  },
  initialState
);
