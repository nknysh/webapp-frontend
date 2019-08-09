import { __, propSatisfies, defaultTo, pipe, includes, props, prop, equals } from 'ramda';

import { AuthTypes } from 'config/enums';
import { createSelector } from 'store/utils';

const qualifiesAsSr = ['SR', 'ADMIN', 'RL'];

const srCheck = pipe(
  defaultTo({}),
  propSatisfies(includes(__, props(qualifiesAsSr, AuthTypes)), 'type')
);

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
  (currentUser, stateCountry, userCountry) => (srCheck(currentUser) ? stateCountry || userCountry : undefined)
);

export const getCurrentUserUuid = createSelector(
  getCurrentUser,
  prop('uuid')
);

export const getCurrentUserType = createSelector(
  getCurrentUser,
  prop('type')
);

export const isAuthenticated = createSelector(
  getAuthToken,
  Boolean
);

export const isSR = createSelector(
  getCurrentUser,
  srCheck
);

export const isRL = createSelector(
  getCurrentUserType,
  equals(AuthTypes.RL)
);
