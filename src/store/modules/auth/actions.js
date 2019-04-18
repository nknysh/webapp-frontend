import { prop, propEq, omit } from 'ramda';

import client from 'api/auth';

import { successAction, errorAction, errorFromResponse } from 'store/common';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_OK = 'AUTH_OK';
export const AUTH_RESET = 'AUTH_RESET';
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_LOG_OUT = 'AUTH_LOG_OUT';
export const AUTH_PASSWORD_RESET = 'AUTH_PASSWORD_RESET';
export const AUTH_SET_PASSWORD = 'AUTH_SET_PASSWORD';

// This constant is for Localstorage.
export const AUTH_TOKEN = 'authToken';
export const AUTH_USER = 'authUser';

export const AccountStatus = Object.freeze({
  PENDING: 'pending',
  REJECTED: 'rejected',
  ACCEPTED: 'accepted',
  VERIFIED: 'verified',
});

const authReset = () => ({
  type: AUTH_RESET,
});

export const setToken = token => ({
  type: AUTH_SET_TOKEN,
  payload: { token },
});

export const authRequest = value => ({
  type: AUTH_REQUEST,
  payload: value,
});

export const authPasswordReset = value => ({
  type: AUTH_PASSWORD_RESET,
  payload: value,
});

export const authSetPasswordReset = value => ({
  type: AUTH_SET_PASSWORD,
  payload: value,
});

export const authOk = values => ({
  type: AUTH_OK,
  payload: values,
});

export const authSignUp = values => ({
  type: AUTH_SIGN_UP,
  payload: values,
});

export const authLogOut = token => ({
  type: AUTH_LOG_OUT,
  payload: token,
});

export const setRememberedToken = token => localStorage.setItem(AUTH_TOKEN, token);
export const setRememberedUser = user => localStorage.setItem(AUTH_USER, JSON.stringify(user));

export const deleteRememberedToken = () => localStorage.removeItem(AUTH_TOKEN);
export const deleteRememberedUser = () => localStorage.removeItem(AUTH_USER);

export const getUser = async dispatch => {
  dispatch(authRequest());

  try {
    const { data } = await client.getUser();
    dispatch(successAction(AUTH_REQUEST, data));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_REQUEST, e));
    throw e;
  }
};

export const signUp = values => async dispatch => {
  dispatch(authSignUp(values));

  try {
    const { data } = await client.signUp({ data: { attributes: values } });
    dispatch(successAction(AUTH_SIGN_UP, data));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_SIGN_UP, e));
    throw e;
  }
};

export const logOut = token => async dispatch => {
  dispatch(authLogOut(token));
  deleteRememberedToken();
  deleteRememberedUser();

  try {
    await client.logOut();
    dispatch(authReset());
    dispatch(successAction(AUTH_LOG_OUT));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_LOG_OUT, e));
    throw e;
  }
};

export const logIn = values => async dispatch => {
  dispatch(authRequest(omit(['password'], values)));

  try {
    const {
      data: { data },
    } = await client.logIn({ data: { attributes: values } });
    const userUuid = prop('uuid', data);

    if (propEq('status', AccountStatus.PENDING, data)) {
      return dispatch(errorAction(AUTH_REQUEST, { status: 403, unverified: true }));
    }

    dispatch(successAction(AUTH_REQUEST, { user: { ...data } }));
    dispatch(setToken(userUuid));
    setRememberedToken(userUuid);
    setRememberedUser(data);
  } catch (e) {
    dispatch(errorFromResponse(AUTH_REQUEST, e));
    throw e;
  }
};

export const resetPassword = values => dispatch => {
  dispatch(authPasswordReset(values));

  return dispatch(successAction(AUTH_PASSWORD_RESET));
};

export const setPassword = values => async dispatch => {
  dispatch(authSetPasswordReset(omit(['values'], values)));

  try {
    await client.setPassword({ data: { attributes: values } });
    dispatch(successAction(AUTH_SET_PASSWORD));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_SET_PASSWORD, e));
    throw e;
  }
};
