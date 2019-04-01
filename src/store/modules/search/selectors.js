import { prop, pipe, path, when, always, inc, evolve } from 'ramda';

import { isEmptyOrNil } from 'utils';

const defaultFromDate = new Date();
const defaultToDate = new Date();
defaultToDate.setDate(inc(defaultToDate.getDate()));

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

export const getSearchDates = pipe(
  getSearchQuery,
  prop('dates'),
  evolve({
    from: when(isEmptyOrNil, always(defaultFromDate)),
    to: when(isEmptyOrNil, always(defaultToDate)),
  })
);
