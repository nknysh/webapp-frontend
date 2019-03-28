import { prop, pipe, path } from 'ramda';

export const getSearch = prop('search');

export const getSearchStatus = pipe(
  getSearch,
  prop('status')
);

export const getSearchResults = pipe(
  getSearch,
  path(['data', 'hotels'])
);

export const getSearchQuery = pipe(
  getSearch,
  prop('query')
);

export const getSearchValue = pipe(
  getSearchQuery,
  path(['search', 'value'])
);
