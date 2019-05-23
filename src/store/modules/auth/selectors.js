import { prop } from 'ramda';

import { createSelector } from 'store/utils';
import { isSr } from 'utils';

export const getAuth = prop('auth');

export const getAuthStatus = createSelector(
  getAuth,
  prop('status')
);

export const getAuthData = createSelector(
  getAuth,
  prop('data')
);

export const getAuthError = createSelector(
  getAuth,
  prop('error')
);

export const getAuthToken = createSelector(
  getAuth,
  prop('token')
);

export const getCurrentCountry = createSelector(
  getAuth,
  prop('country')
);

export const getCurrentUser = createSelector(
  getAuthData,
  prop('user')
);

export const getCurrentUserCountryCode = createSelector(
  getCurrentUser,
  prop('countryCode')
);

export const getUserCountryContext = createSelector(
  [getCurrentUser, getCurrentCountry, getCurrentUserCountryCode],
  (currentUser, stateCountry, userCountry) => (isSr(currentUser) ? stateCountry || userCountry : undefined)
);

export const isAuthenticated = createSelector(
  getAuthToken,
  Boolean
);
