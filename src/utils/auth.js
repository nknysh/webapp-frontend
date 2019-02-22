import { pipe, prop, propOr } from 'ramda';

import { getQuery } from './location';

const getTokenFromWindow = pipe(
  prop('location'),
  getQuery,
  propOr(false, 'token')
);

export const getToken = windowExists => getTokenFromWindow(windowExists) || localStorage.getItem('authToken');
