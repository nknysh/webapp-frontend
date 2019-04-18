import { prop, pipe } from 'ramda';

export const getAuth = prop('auth');

export const getAuthStatus = pipe(
  getAuth,
  prop('status')
);

export const getAuthData = pipe(
  getAuth,
  prop('data')
);

export const getAuthError = pipe(
  getAuth,
  prop('error')
);

export const getAuthToken = pipe(
  getAuth,
  prop('token')
);

export const getCurrentUser = pipe(
  getAuthData,
  prop('user')
);

export const isAuthenticated = pipe(
  getAuthToken,
  Boolean
);
