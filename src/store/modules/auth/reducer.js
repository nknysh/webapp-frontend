import { tryCatch, always } from 'ramda';

import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';
import { initialState, loadingReducer, successReducer, errorReducer, savingReducer } from 'store/common';

import {
  AUTH_TOKEN,
  AUTH_SET_TOKEN,
  AUTH_REQUEST,
  AUTH_SIGN_UP,
  AUTH_PASSWORD_RESET,
  AUTH_VALIDATE_PASSWORD_RESET_TOKEN,
  AUTH_USER,
  AUTH_RESET,
  AUTH_LOG_OUT,
} from './actions';

const authSetToken = (state, { payload: { token } }) => ({
  ...state,
  token,
});

const authReset = () => ({ ...initialState });

const parseJson = tryCatch(JSON.parse, always(undefined));

export default (state = initialState, payload) => {
  const localStorageUser = parseJson(localStorage.getItem(AUTH_USER));
  const localStorageToken = localStorage.getItem(AUTH_TOKEN) || undefined;

  const tokenState = {
    ...state,
    token: localStorageToken,
    data: {
      user: localStorageUser,
    },
  };

  return createReducer(
    {
      [AUTH_SET_TOKEN]: authSetToken,
      [AUTH_RESET]: authReset,

      [AUTH_REQUEST]: loadingReducer,
      [getSuccessActionName(AUTH_REQUEST)]: successReducer,
      [getErrorActionName(AUTH_REQUEST)]: errorReducer,

      [AUTH_SIGN_UP]: savingReducer,
      [getSuccessActionName(AUTH_SIGN_UP)]: successReducer,
      [getErrorActionName(AUTH_SIGN_UP)]: errorReducer,

      [AUTH_LOG_OUT]: savingReducer,
      [getSuccessActionName(AUTH_LOG_OUT)]: successReducer,
      [getErrorActionName(AUTH_LOG_OUT)]: errorReducer,

      [AUTH_PASSWORD_RESET]: savingReducer,
      [getSuccessActionName(AUTH_PASSWORD_RESET)]: successReducer,
      [getErrorActionName(AUTH_PASSWORD_RESET)]: errorReducer,

      [AUTH_VALIDATE_PASSWORD_RESET_TOKEN]: savingReducer,
      [getSuccessActionName(AUTH_VALIDATE_PASSWORD_RESET_TOKEN)]: successReducer,
      [getErrorActionName(AUTH_VALIDATE_PASSWORD_RESET_TOKEN)]: errorReducer,
    },
    initialState
  )(tokenState, payload);
};
