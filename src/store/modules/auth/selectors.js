import { prop, pipe } from 'ramda';

export const getAuth = prop('auth');

export const getAuthData = pipe(
  getAuth,
  prop('data')
);
export const getAuthToken = pipe(
  getAuthData,
  prop('token')
);
export const getAuthLoading = pipe(
  getAuthData,
  prop('loading')
);
export const getCurrentUser = pipe(
  getAuthData,
  prop('user')
);

export const isAuthenticated = pipe(
  getAuthToken,
  Boolean
);

export const isAuthLoading = pipe(
  getAuthLoading,
  Boolean
);
