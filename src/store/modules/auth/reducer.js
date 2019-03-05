import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';
import { initialState, loadingReducer, successReducer, errorReducer, savingReducer } from 'store/common';

import { AUTH_TOKEN, AUTH_SET_TOKEN, AUTH_REQUEST, AUTH_SIGN_UP } from './actions';

const authSetToken = (state, { payload: { token } }) => ({
  ...state,
  token,
});

export default (state = initialState, payload) => {
  const tokenState = {
    ...state,
    token: localStorage.getItem(AUTH_TOKEN) || undefined,
  };

  return createReducer(
    {
      [AUTH_SET_TOKEN]: authSetToken,

      [AUTH_REQUEST]: loadingReducer,
      [getSuccessActionName(AUTH_REQUEST)]: successReducer,
      [getErrorActionName(AUTH_REQUEST)]: errorReducer,

      [AUTH_SIGN_UP]: savingReducer,
      [getSuccessActionName(AUTH_SIGN_UP)]: successReducer,
      [getErrorActionName(AUTH_SIGN_UP)]: errorReducer,
    },
    initialState
  )(tokenState, payload);
};
