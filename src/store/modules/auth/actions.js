import { prop, propEq, omit, propOr, mergeDeepLeft, equals } from 'ramda';
import { FORBIDDEN } from 'http-status';

import client from 'api/auth';
import userClient from 'api/users';
import { UserStatusTypes, AuthTypes } from 'config/enums';

import { genericAction, successAction, errorAction, errorFromResponse, storeReset } from 'store/common';
import { enqueueNotification } from 'store/modules/ui/actions';
import { getCurrentUserType } from './selectors';

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

/**
 * Auth reset action
 *
 * @returns {object}
 */
const authReset = () => ({
  type: AUTH_RESET,
});

/**
 * Set token action
 *
 * @param {string} token
 * @returns {object}
 */
export const setToken = token => ({
  type: AUTH_SET_TOKEN,
  payload: { token },
});

/**
 * Auth request action
 *
 * @param {*} value
 * @returns {object}
 */
export const authRequest = value => ({
  type: AUTH_REQUEST,
  payload: value,
});

/**
 * Auth password reset action
 *
 * @param {*} value
 * @returns {object}
 */
export const authPasswordReset = value => ({
  type: AUTH_PASSWORD_RESET,
  payload: value,
});

/**
 * Auth set password reset action
 *
 * @param {*} value
 * @returns {object}
 */
export const authSetPasswordReset = value => ({
  type: AUTH_SET_PASSWORD,
  payload: value,
});

/**
 * Auth ok action
 *
 * @param {*} values
 * @returns {object}
 */
export const authOk = values => ({
  type: AUTH_OK,
  payload: values,
});

/**
 * Auth sign up action
 *
 * @param {*} values
 * @returns {object}
 */
export const authSignUp = values => ({
  type: AUTH_SIGN_UP,
  payload: values,
});

/**
 * Auth log out action
 *
 * @param {string} token
 * @returns {object}
 */
export const authLogOut = token => ({
  type: AUTH_LOG_OUT,
  payload: token,
});

/**
 * Auth set country action
 *
 * @param {string} countryCode
 * @returns {object}
 */
export const authSetCountryAction = countryCode => ({
  type: AUTH_COUNTRY_SET,
  payload: countryCode,
});

/**
 * Set remembered token
 *
 * @param {string} token
 */
export const setRememberedToken = token => localStorage.setItem(AUTH_TOKEN, token);

/**
 * Set remembered user
 *
 * @param {object} user
 */
export const setRememberedUser = user => localStorage.setItem(AUTH_USER, JSON.stringify(user));

/**
 * Set remembered country
 *
 * @param {string} countryCode
 */
export const setRememberedCountry = countryCode => localStorage.setItem(AUTH_COUNTRY_CODE, countryCode);

/**
 * Delete remembered token
 */
export const deleteRememberedToken = () => localStorage.removeItem(AUTH_TOKEN);

/**
 * Delete remembered user
 */
export const deleteRememberedUser = () => localStorage.removeItem(AUTH_USER);

/**
 * Delete remembered country
 */
export const deleteRememberedCountry = () => localStorage.removeItem(AUTH_COUNTRY_CODE);

/**
 * Auth set country action
 *
 * Sets the remembered country into local storage
 *
 * @param {string} countryCode
 * @returns {Function}
 */
export const authSetCountry = countryCode => dispatch => {
  setRememberedCountry(countryCode);
  dispatch(authSetCountryAction(countryCode));
};

/**
 * Get user action
 *
 * @param {Function} dispatch
 */
export const getUser = async dispatch => {
  dispatch(authRequest());

  try {
    const { data } = await client.getUser();
    dispatch(successAction(AUTH_REQUEST, data));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_REQUEST, e, 'There was a problem fetching the current user.'));
  }
};

/**
 * Sign up action
 *
 * @param {object} values
 * @returns {Function}
 */
export const signUp = values => async dispatch => {
  dispatch(authSignUp(values));

  try {
    const { data } = await client.signUp({ data: { attributes: values } });
    dispatch(successAction(AUTH_SIGN_UP, data));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_SIGN_UP, e));
  }
};

/**
 * Clear user action
 *
 * Removes user form local storage
 *
 * @param {Function} dispatch
 */
const clearUser = dispatch => {
  deleteRememberedToken();
  deleteRememberedUser();
  deleteRememberedCountry();

  dispatch(authReset());
  dispatch(successAction(AUTH_LOG_OUT, {}));
  dispatch(storeReset());
};

/**
 * Log out action
 *
 * Trrigger logout request
 *
 * @param {string} token
 * @returns {Function}
 */
export const logOut = token => async dispatch => {
  dispatch(authLogOut(token));

  clearUser(dispatch);

  try {
    await client.logOut();
  } catch (e) {
    return true;
  }
};

/**
 * Persist user action
 *
 * Sets user data to local storage
 *
 * @param {Function} dispatch
 * @param {object} data
 */
const persistUser = (dispatch, data) => {
  const userUuid = prop('uuid', data);

  // If a user is 'pending' then throw a forbidden error and return
  if (propEq('status', UserStatusTypes.PENDING, data)) {
    return dispatch(errorAction(AUTH_REQUEST, { status: FORBIDDEN, unverified: true }));
  }

  setRememberedToken(userUuid);
  setRememberedUser(data);
  setRememberedCountry(propOr('GB', 'countryCode', data));

  dispatch(setToken(userUuid));
};

/**
 * Log in action
 *
 * @param {object} values
 * @returns {Function}
 */
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

/**
 * Reset password action
 *
 * @param {object} values
 * @returns {Function}
 */
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

/**
 * Set password action
 *
 * @param {object} values
 * @returns {Function}
 */
export const setPassword = values => async dispatch => {
  dispatch(authSetPasswordReset(omit(['values'], values)));

  try {
    await client.setPassword({ data: { attributes: values } });
    dispatch(successAction(AUTH_SET_PASSWORD, values));
  } catch (e) {
    dispatch(errorFromResponse(AUTH_SET_PASSWORD, e));
  }
};

/**
 * Auth check action
 *
 * @param {object} params
 * @returns {Function}
 */
export const authCheck = params => async (dispatch, getState) => {
  dispatch(genericAction(AUTH_CHECK));

  const role = getCurrentUserType(getState());

  // Associations for auth call are different per role
  // TAs : assignedSalesRepresentatives
  // Everyone else : assignedTravelAgents
  const authParams = mergeDeepLeft(params, {
    associations: equals(AuthTypes.TA, role) ? 'assignedSalesRepresentatives' : 'assignedTravelAgents',
  });

  try {
    const {
      data: { data },
    } = await userClient.me(authParams);
    dispatch(successAction(AUTH_CHECK, { user: { ...data } }));
    persistUser(dispatch, data);
  } catch (e) {
    clearUser(dispatch);

    throw e;
  }
};

/**
 * Update password action
 *
 * @param {object} body
 * @returns {Function}
 */
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
