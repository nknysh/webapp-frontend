import { prop, propEq, omit, propOr } from 'ramda';
import { FORBIDDEN } from 'http-status';

import client from 'api/auth';
import userClient from 'api/users';
import { UserStatusTypes } from 'config/enums';

import { genericAction, successAction, errorAction, errorFromResponse, storeReset } from 'store/common';
import { enqueueNotification } from 'store/modules/ui/actions';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_OK = 'AUTH_OK';
export const AUTH_RESET = 'AUTH_RESET';
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_LOG_OUT = 'AUTH_LOG_OUT';
export const AUTH_PASSWORD_RESET = 'AUTH_PASSWORD_RESET';
export const AUTH_SET_PASSWORD = 'AUTH_SET_PASSWORD';
export const AUTH_COUNTRY_SET = 'AUTH_COUNTRY_SET';
export const AUTH_PASSWORD_UPDATE = 'AUTH_PASSWORD_UPDATE';

// Localstorage constants for auth
export const AUTH_TOKEN = 'authToken';
export const AUTH_USER = 'authUser';
export const AUTH_COUNTRY_CODE = 'authCountryCode';

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

export const authSetCountryAction = countryCode => ({
  type: AUTH_COUNTRY_SET,
  payload: countryCode,
});

export const setRememberedToken = token => localStorage.setItem(AUTH_TOKEN, token);
export const setRememberedUser = user => localStorage.setItem(AUTH_USER, JSON.stringify(user));
export const setRememberedCountry = countryCode => localStorage.setItem(AUTH_COUNTRY_CODE, countryCode);

export const deleteRememberedToken = () => localStorage.removeItem(AUTH_TOKEN);
export const deleteRememberedUser = () => localStorage.removeItem(AUTH_USER);
export const deleteRememberedCountry = () => localStorage.removeItem(AUTH_COUNTRY_CODE);

export const authSetCountry = countryCode => dispatch => {
  setRememberedCountry(countryCode);
  dispatch(authSetCountryAction(countryCode));
};

export const getUser = async dispatch => {
  dispatch(authRequest());

  try {
    const { data } = await client.getUser();
    dispatch(successAction(AUTH_REQUEST, data));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_REQUEST, e, 'There was a problem fetching the current user.'));
  }
};

export const signUp = values => async dispatch => {
  dispatch(authSignUp(values));

  try {
    const { data } = await client.signUp({ data: { attributes: values } });
    dispatch(successAction(AUTH_SIGN_UP, data));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_SIGN_UP, e));
  }
};

const clearUser = dispatch => {
  deleteRememberedToken();
  deleteRememberedUser();
  deleteRememberedCountry();

  dispatch(authReset());
  dispatch(successAction(AUTH_LOG_OUT, {}));
  dispatch(storeReset());
};

export const logOut = token => async dispatch => {
  dispatch(authLogOut(token));

  clearUser(dispatch);

  try {
    await client.logOut();
  } catch (e) {
    return true;
  }
};

const persistUser = (dispatch, data) => {
  const userUuid = prop('uuid', data);

  if (propEq('status', UserStatusTypes.PENDING, data)) {
    return dispatch(errorAction(AUTH_REQUEST, { status: FORBIDDEN, unverified: true }));
  }

  setRememberedToken(userUuid);
  setRememberedUser(data);
  setRememberedCountry(propOr('GB', 'countryCode', data));

  dispatch(setToken(userUuid));
};

export const logIn = values => async dispatch => {
  dispatch(authRequest(omit(['password'], values)));

  try {
    const {
      data: { data },
    } = await client.logIn({ data: { attributes: values } });

    persistUser(dispatch, data);
    dispatch(successAction(AUTH_REQUEST, { user: { ...data } }));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_REQUEST, e));
  }
};

export const resetPassword = values => async dispatch => {
  dispatch(authPasswordReset(values));

  try {
    await client.resetPassword({ data: { attributes: values } });
    dispatch(successAction(AUTH_PASSWORD_RESET, values));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_SET_PASSWORD, e));
    throw e;
  }
};

export const setPassword = values => async dispatch => {
  dispatch(authSetPasswordReset(omit(['values'], values)));

  try {
    await client.setPassword({ data: { attributes: values } });
    dispatch(successAction(AUTH_SET_PASSWORD, values));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_SET_PASSWORD, e));
  }
};

export const authCheck = () => async dispatch => {
  dispatch(genericAction(AUTH_CHECK));

  try {
    const {
      data: { data },
    } = await userClient.me();
    dispatch(successAction(AUTH_CHECK, { user: { ...data } }));
    persistUser(dispatch, data);
  } catch (e) {
    clearUser(dispatch);

    throw e;
  }
};

export const updatePassword = body => async dispatch => {
  dispatch(genericAction(AUTH_PASSWORD_UPDATE, body));

  try {
    await client.updatePassword({ data: { attributes: body } });
    dispatch(successAction(AUTH_SET_PASSWORD, body));
    dispatch(enqueueNotification({ message: 'Password has been updated.', options: { variant: 'success' } }));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_PASSWORD_UPDATE, e));
  }
};
