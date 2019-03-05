import { prop } from 'ramda';

import mockUser from 'config/auth/mockUser';
import { successAction, errorAction } from 'store/common/actions';

import AuthApi from 'api/auth';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_OK = 'AUTH_OK';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_RESET = 'AUTH_RESET';
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';

// This constant is for Localstorage.
export const AUTH_TOKEN = 'authToken';

const mockToken = '123456789';

const authError = value => {
  localStorage.removeItem(AUTH_TOKEN);

  return {
    type: AUTH_ERROR,
    payload: value,
  };
};

const authReset = value => ({
  type: AUTH_RESET,
  payload: value,
});

export const getUserFromToken = ({ token }) => dispatch => {
  dispatch(authRequest({ token }));
  return AuthApi.getUserFromToken({ token })
    .then(response => {
      const ok = { token, user: response.data };
      dispatch(authOk(ok));
    })
    .catch(error => {
      dispatch(authError(error));
      throw error;
    });
};

export const logOut = values => dispatch => {
  localStorage.removeItem(AUTH_TOKEN);
  dispatch(authReset(values));
};

export const setToken = token => ({
  type: AUTH_SET_TOKEN,
  payload: { token },
});

export const authRequest = value => ({
  type: AUTH_REQUEST,
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

export const setRememberedToken = token => localStorage.setItem(AUTH_TOKEN, token);

export const signUp = values => dispatch => {
  dispatch(authSignUp(values));

  // This is where APi call would be handled.
  // return AuthApi.signUp(values).then(successAction).catch(errorAction);

  /**
   * @todo Return from API call the correct action and remove this
   */
  return values ? dispatch(successAction(AUTH_SIGN_UP, values)) : dispatch(errorAction(AUTH_SIGN_UP, values));
};

export const logIn = values => dispatch => {
  dispatch(authRequest(values));

  // This is where APi call would be handled.
  // return AuthApi.logIn(values).then(successAction).catch(errorAction);

  /**
   * @todo Return from API call the correct action and remove this
   */

  const email = prop('email', values);

  if (email === 'unverified@test.com') {
    return dispatch(errorAction(AUTH_REQUEST, { unverified: true }));
  }

  dispatch(setToken({ mockToken }));
  setRememberedToken(mockToken);

  return dispatch(successAction(AUTH_REQUEST, { user: { ...mockUser } }));
};

export const resetPassword = values => async dispatch => {
  dispatch(authRequest(values));

  // This is where APi call would be handled.
  // return AuthApi.resetPassword(values).then(successAction).catch(errorAction);

  /**
   * @todo Return from API call the correct action and remove this
   */

  return dispatch(successAction(AUTH_REQUEST, {}));
};
