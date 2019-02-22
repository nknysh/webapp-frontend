import { pipe, propOr } from 'ramda';
import qs from 'qs';

const qsConfig = {
  ignoreQueryPrefix: true,
};

const parseQueryString = search => qs.parse(search, qsConfig);

export const getQuery = pipe(
  propOr('', 'search'),
  parseQueryString
);
