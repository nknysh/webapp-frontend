import { prop, pipe, path, when, always, inc, evolve, defaultTo } from 'ramda';

import { getStatus, getResults } from 'store/common/selectors';
import { isEmptyOrNil, toDate } from 'utils';

const defaultFromDate = toDate();
const defaultToDate = toDate();
defaultToDate.setDate(inc(defaultToDate.getDate()));

export const getSearch = prop('search');

export const getSearchStatus = pipe(
  getSearch,
  getStatus
);

export const getSearchResults = pipe(
  getSearch,
  getResults,
  prop('hotels')
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
  adult: defaultTo(0),
  teens: defaultTo(0),
  children: defaultTo(0),
  infant: defaultTo(0),
};

export const getSearchLodgings = pipe(
  getSearchQuery,
  prop('lodging'),
  evolve(searchLodgingsTransformations)
);
