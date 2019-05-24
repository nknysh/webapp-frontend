import { lensProp, set, pipe, lensPath, propOr } from 'ramda';

import { initialState, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { parseJson } from 'utils';

import {
  AUTH_COUNTRY_CODE,
  AUTH_COUNTRY_SET,
  AUTH_LOG_OUT,
  AUTH_PASSWORD_RESET,
  AUTH_REQUEST,
  AUTH_RESET,
  AUTH_SET_PASSWORD,
  AUTH_SET_TOKEN,
  AUTH_SIGN_UP,
  AUTH_TOKEN,
  AUTH_USER,
} from './actions';

const tokenLens = lensProp('token');
const countryLens = lensProp('country');
const userLens = lensPath(['data', 'user']);

const authSetToken = (state, { payload: { token } }) => set(tokenLens, token, state);
const authSetCountry = (state, { payload }) => set(countryLens, payload, state);

const authReset = () => ({ ...initialState });

export default (state = initialState, payload) => {
  const localStorageUser = parseJson(localStorage.getItem(AUTH_USER));
  const localStorageToken = localStorage.getItem(AUTH_TOKEN) || undefined;
  const localStorageCountry =
    localStorage.getItem(AUTH_COUNTRY_CODE) || propOr(undefined, 'countryCode', localStorageUser);

  const tokenState = pipe(
    set(tokenLens, localStorageToken),
    set(countryLens, localStorageCountry),
    set(userLens, localStorageUser)
  )(state);

  return createReducer(
    {
      [AUTH_SET_TOKEN]: authSetToken,
      [AUTH_RESET]: authReset,
      [AUTH_COUNTRY_SET]: authSetCountry,

      [AUTH_REQUEST]: sendingReducer,
      [getSuccessActionName(AUTH_REQUEST)]: successReducer,
      [getErrorActionName(AUTH_REQUEST)]: errorReducer,

      [AUTH_SIGN_UP]: sendingReducer,
      [getSuccessActionName(AUTH_SIGN_UP)]: successReducer,
      [getErrorActionName(AUTH_SIGN_UP)]: errorReducer,

      [AUTH_LOG_OUT]: sendingReducer,
      [getSuccessActionName(AUTH_LOG_OUT)]: successReducer,
      [getErrorActionName(AUTH_LOG_OUT)]: errorReducer,

      [AUTH_PASSWORD_RESET]: sendingReducer,
      [getSuccessActionName(AUTH_PASSWORD_RESET)]: successReducer,
      [getErrorActionName(AUTH_PASSWORD_RESET)]: errorReducer,

      [AUTH_SET_PASSWORD]: sendingReducer,
      [getSuccessActionName(AUTH_SET_PASSWORD)]: successReducer,
      [getErrorActionName(AUTH_SET_PASSWORD)]: errorReducer,
    },
    initialState
  )(tokenState, payload);
};
