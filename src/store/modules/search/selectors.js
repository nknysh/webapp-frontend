import { prop, pipe, path, when, always, inc, evolve, defaultTo } from 'ramda';

import { isEmptyOrNil, toDate } from 'utils';

const defaultFromDate = toDate();
const defaultToDate = toDate();
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

const searchDatesTransformations = {
  from: when(isEmptyOrNil, always(defaultFromDate)),
  to: when(isEmptyOrNil, always(defaultToDate)),
};

export const getSearchDates = pipe(
  getSearchQuery,
  prop('dates'),
  evolve(searchDatesTransformations)
);

const searchLodgingsTransformations = {
  quantity: defaultTo(0),
  adults: defaultTo(0),
  teens: defaultTo(0),
  children: defaultTo(0),
  infants: defaultTo(0),
};

export const getSearchLodgings = pipe(
  getSearchQuery,
  prop('lodging'),
  evolve(searchLodgingsTransformations)
);
