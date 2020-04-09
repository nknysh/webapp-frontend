import { __, propSatisfies, defaultTo, pipe, includes, props, prop, equals } from 'ramda';

import { AuthTypes } from 'config/enums';
import { createSelector } from 'store/utils';

// List of roles that are SR or above
const qualifiesAsSr = ['SR', 'ADMIN', 'RL'];

/**
 * SR Check
 *
 * Checks a user role if it is SR+
 *
 * @param {string}
 * @returns {boolean}
 */
const srCheck = pipe(defaultTo({}), propSatisfies(includes(__, props(qualifiesAsSr, AuthTypes)), 'type'));

/**
 * Get auth selector
 *
 * @param {object}
 * @returns {*}
 */
export const getAuth = prop('auth');

/**
 * Get auth status selector
 *
 * @param {object}
 * @returns {string}
 */
export const getAuthStatus = createSelector(getAuth, prop('status'));

/**
 * Get auth data selector
 *
 * @param {object}
 * @returns {*}
 */
export const getAuthData = createSelector(getAuth, prop('data'));

/**
 * Get auth error selector
 *
 * @param {object}
 * @returns {*}
 */
export const getAuthError = createSelector(getAuth, prop('error'));

/**
 * Get auth token selector
 *
 * @param {object}
 * @returns {string}
 */
export const getAuthToken = createSelector(getAuth, prop('token'));

export const getLoggedIn = createSelector(getAuth, prop('loggedIn'));

/**
 * Get current country selector
 *
 * @param {object}
 * @returns {*}
 */
export const getCurrentCountry = createSelector(getAuth, prop('country'));

/**
 * Get current user selector
 *
 * @param {object}
 * @returns {object}
 */
export const getCurrentUser = createSelector(getAuthData, prop('user'));

/**
 * Get current country selector
 *
 * @param {object}
 * @returns {string}
 */
export const getCurrentUserCountryCode = createSelector(getCurrentUser, prop('countryCode'));

/**
 * Get user country context selector
 *
 * Returns the users country if they are an SR, either from
 * state or from the users object
 *
 * @param {object}
 * @returns {string}
 */
export const getUserCountryContext = createSelector(
  [getCurrentUser, getCurrentCountry, getCurrentUserCountryCode],
  (currentUser, stateCountry, userCountry) => (srCheck(currentUser) ? stateCountry || userCountry : '')
);

/**
 * Get current user uuid selector
 *
 * @param {object}
 * @returns {string}
 */
export const getCurrentUserUuid = createSelector(getCurrentUser, prop('uuid'));

/**
 * Get current user type selector
 *
 * @param {object}
 * @returns {string}
 */
export const getCurrentUserType = createSelector(getCurrentUser, prop('type'));

/**
 * Is authenticated selector
 *
 * @param {object}
 * @returns {boolean}
 */
export const isAuthenticated = createSelector(getAuthToken, Boolean);

/**
 * Is SR selector
 *
 * Returns if the current user is an SR
 *
 * @param {object}
 * @returns {boolean}
 */
export const isSR = createSelector(getCurrentUser, srCheck);

/**
 * Is RL selector
 *
 * Returns if the current user is an RL
 *
 * @param {object}
 * @returns {boolean}
 */
export const isRL = createSelector(getCurrentUserType, equals(AuthTypes.RL));
