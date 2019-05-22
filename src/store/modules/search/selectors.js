import { curry, prop, pipe, path, when, always, inc, evolve, propOr, pathOr } from 'ramda';
import { createSelector } from 'store/utils';
import { getStatus, getData } from 'store/common';

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

export const getSearchDates = createSelector(
  getSearchQuery,
  pipe(
    prop('dates'),
    evolve(searchDatesTransformations)
  )
);

export const getSearchLodgings = pipe(
  getSearchQuery,
  prop('lodging')
);

export const getSearchFiltersRegions = pipe(
  getSearchResultsMeta,
  pathOr([], ['filters', 'regions'])
);

export const getSearchFiltersStarRatings = pipe(
  getSearchResultsMeta,
  pathOr([], ['filters', 'starRatings'])
);

export const getSearchFiltersFeatures = pipe(
  getSearchResultsMeta,
  pathOr([], ['filters', 'amenities'])
);
