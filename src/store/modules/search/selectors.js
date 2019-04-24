import { curry, prop, pipe, path, when, always, inc, evolve, defaultTo, propOr } from 'ramda';

import { getStatus, getData } from 'store/common/selectors';
import { isEmptyOrNil, toDate } from 'utils';

const defaultFromDate = toDate();
const defaultToDate = toDate();
defaultToDate.setDate(inc(defaultToDate.getDate()));

export const getSearch = prop('search');

export const getSearchStatus = pipe(
  getSearch,
  getStatus
);

export const getSearchData = pipe(
  getSearch,
  getData
);

export const getSearchResults = curry((state, type) =>
  pipe(
    getSearchData,
    propOr({}, type)
  )(state)
);

export const getSearchResultsMeta = pipe(
  getSearchResults,
  prop('meta')
);

export const getSearchResultsResult = pipe(
  getSearchResults,
  prop('result')
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
