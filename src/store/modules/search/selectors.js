import {
  __,
  all,
  curry,
  prop,
  pipe,
  path,
  when,
  always,
  inc,
  evolve,
  propOr,
  pathOr,
  allPass,
  has,
  complement,
  and,
  propSatisfies,
  gt,
} from 'ramda';
import { isNilOrEmpty, renameKeys } from 'ramda-adjunct';

import { createSelector } from 'store/utils';
import { getStatus, getData } from 'store/common';

import { toDate } from 'utils';

const defaultFromDate = toDate();
const defaultToDate = toDate();
defaultToDate.setDate(inc(defaultToDate.getDate()));

const hasDate = propName => allPass([has(propName), propSatisfies(complement(isNilOrEmpty), propName)]);
const hasDates = allPass([complement(isNilOrEmpty), hasDate('startDate'), hasDate('endDate')]);
const hasAdults = propSatisfies(gt(__, 0), 'numberOfAdults');
const hasLodgings = allPass([complement(isNilOrEmpty), all(hasAdults)]);

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
  propOr({}, 'query')
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
    renameKeys({ from: 'startDate', to: 'endDate' }),
    evolve(searchDatesTransformations)
  )
);

export const getSearchLodgings = createSelector(
  getSearchQuery,
  prop('lodging')
);

export const getSearchMealPlan = createSelector(
  getSearchQuery,
  path(['filters', 'mealPlan'])
);

export const getSearchFiltersRegions = createSelector(
  getSearchResultsMeta,
  pathOr([], ['filters', 'regions'])
);

export const getSearchFiltersStarRatings = createSelector(
  getSearchResultsMeta,
  pathOr([], ['filters', 'starRatings'])
);

export const getSearchFiltersFeatures = createSelector(
  getSearchResultsMeta,
  pathOr([], ['filters', 'amenities'])
);

export const getSearchFiltersPrices = createSelector(
  getSearchResultsMeta,
  pathOr([], ['filters', 'prices'])
);

export const getCanSearch = createSelector(
  getSearchQuery,
  ({ dates, lodging }) => {
    const datesExist = hasDates(dates);
    const lodgingsExist = hasLodgings(lodging);

    return and(datesExist, lodgingsExist);
  }
);
