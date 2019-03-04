import { prop } from 'ramda';

import { successAction, errorAction } from 'store/common/actions';

import AuthApi from 'api/auth';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_OK = 'AUTH_OK';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_RESET = 'AUTH_RESET';
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';

// This constant is for Localstorage.
const AUTH_TOKEN = 'authToken';

const authRequest = value => ({
  type: AUTH_REQUEST,
  payload: value,
});

export const authOk = value => {
  const token = prop('token', value);
  // TODO(mark): We should use something like sagas to store this token.
  // Right now, this is called when we logIn and getUserFromToken.
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  return {
    type: AUTH_OK,
    payload: value,
  };
};

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

export const logIn = values => async dispatch => {
  dispatch(authRequest(values));
  try {
    const response = await AuthApi.logIn(values);
    const { id, user } = response.data;
    dispatch(authOk({ token: id, user }));
    return user;
  } catch (error) {
    dispatch(authError(error));
    throw error;
  }
};

export const logOut = values => dispatch => {
  localStorage.removeItem(AUTH_TOKEN);
  dispatch(authReset(values));
};

export const resetPassword = values => async dispatch => {
  dispatch(authRequest(values));

  try {
    const response = await AuthApi.resetPassword(values);
    return response;
  } catch (error) {
    dispatch(authError(error));
    throw error;
  }
};

export const setToken = token => ({
  type: AUTH_SET_TOKEN,
  payload: { token },
});

export const authSignUp = values => ({
  type: AUTH_SIGN_UP,
  payload: values,
});

export const signUp = values => dispatch => {
  dispatch(authSignUp(values));

  // This is where APi call would be handled.
  // return AuthApi.signUp(values).then(successAction).catch(errorAction);

  /**
   * @todo Return from API call the correct action and remove this
   */
  return values ? dispatch(successAction(AUTH_SIGN_UP, values)) : dispatch(errorAction(AUTH_SIGN_UP, values));
};
