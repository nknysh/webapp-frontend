import { prop, propEq, omit } from 'ramda';

import client from 'api/auth';

import { successAction, errorAction } from 'store/common/actions';

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

export const getUser = dispatch => {
  dispatch(authRequest());

  return client
    .getUser()
    .then(response => dispatch(successAction(AUTH_REQUEST, response.data)))
    .catch(error => dispatch(errorAction(AUTH_REQUEST, error)));
};

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

export const signUp = values => dispatch => {
  dispatch(authSignUp(values));

  return client
    .signUp({ data: { attributes: values } })
    .then(({ data }) => dispatch(successAction(AUTH_SIGN_UP, data)))
    .catch(error => dispatch(errorAction(AUTH_SIGN_UP, error.response)));
};

export const logOut = token => dispatch => {
  dispatch(authLogOut(token));
  deleteRememberedToken();
  deleteRememberedUser();

  const onSuccess = () => {
    dispatch(authReset());
    dispatch(successAction(AUTH_LOG_OUT));
  };

  return client
    .logOut()
    .then(onSuccess)
    .catch(error => dispatch(errorAction(AUTH_LOG_OUT, error.response)));
};

export const logIn = values => dispatch => {
  dispatch(authRequest(omit(['password'], values)));

  const onSuccess = ({ data: { data } }) => {
    const userUuid = prop('uuid', data);

    if (propEq('status', AccountStatus.PENDING, data)) {
      return dispatch(errorAction(AUTH_REQUEST, { status: 403, unverified: true }));
    }

    dispatch(successAction(AUTH_REQUEST, { user: { ...data } }));
    dispatch(setToken(userUuid));
    setRememberedToken(userUuid);
    setRememberedUser(data);
  };

  return client
    .logIn({ data: { attributes: values } })
    .then(onSuccess)
    .catch(error => dispatch(errorAction(AUTH_REQUEST, error.response)));
};

export const resetPassword = values => dispatch => {
  dispatch(authPasswordReset(values));

  // return client
  //   .resetPassword(values)
  //   .then(() => dispatch(successAction(AUTH_PASSWORD_RESET)))
  //   .catch(error => dispatch(errorAction(AUTH_PASSWORD_RESET, error.response)));

  return dispatch(successAction(AUTH_PASSWORD_RESET));
};

export const setPassword = values => dispatch => {
  dispatch(authSetPasswordReset(omit(['values'], values)));

  return client
    .setPassword({ data: { attributes: values } })
    .then(() => dispatch(successAction(AUTH_SET_PASSWORD)))
    .catch(error => dispatch(errorAction(AUTH_SET_PASSWORD, error.response)));
};
