import { curry, prop, pipe, path, when, always, inc, evolve, propOr, pathOr } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import { createSelector } from 'store/utils';
import { getStatus, getData } from 'store/common';

import { toDate } from 'utils';

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
  startDate: when(isNilOrEmpty, always(defaultFromDate)),
  endDate: when(isNilOrEmpty, always(defaultToDate)),
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

export const getSearchFiltersPrices = createSelector(
  getSearchResultsMeta,
  pathOr([], ['filters', 'prices'])
);
