import { pipe, propOr } from 'ramda';
import qs from 'qs';

const qsConfig = {
  ignoreQueryPrefix: true,
};

export const parseQueryString = search => qs.parse(search, qsConfig);
export const buildQueryString = search => qs.stringify(search);

export const getQuery = pipe(
  propOr('', 'search'),
  parseQueryString
);
