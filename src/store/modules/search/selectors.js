import {
  __,
  all,
  allPass,
  always,
  and,
  complement,
  curry,
  evolve,
  gt,
  has,
  inc,
  map,
  partial,
  path,
  reject,
  pathOr,
  pipe,
  prop,
  propOr,
  propSatisfies,
  values,
  when,
  pick,
} from 'ramda';
import { isNilOrEmpty, renameKeys } from 'ramda-adjunct';

import { createSelector } from 'store/utils';
import { getStatus, getData, getArg } from 'store/common';
import { getCountry } from 'store/modules/countries/selectors';
import { getHotel } from 'store/modules/hotels/selectors';

import { Occassions } from 'config/enums';
import { toDate } from 'utils';

const defaultFromDate = toDate();
const defaultToDate = toDate();
defaultToDate.setDate(inc(defaultToDate.getDate()));

const searchDatesTransformations = {
  startDate: when(isNilOrEmpty, always(defaultFromDate)),
  endDate: when(isNilOrEmpty, always(defaultToDate)),
};

/**
 * Has date
 *
 * @param {string} propName
 * @returns {boolean}
 */
const hasDate = propName => allPass([has(propName), propSatisfies(complement(isNilOrEmpty), propName)]);

/**
 * Has dates
 *
 * @param {Array}
 * @returns {boolean}
 */
const hasDates = allPass([complement(isNilOrEmpty), hasDate('startDate'), hasDate('endDate')]);

/**
 * Has adults
 *
 * @param {object}
 * @returns {boolean}
 */
const hasAdults = propSatisfies(gt(__, 0), 'numberOfAdults');

/**
 * Has lodgings
 *
 * @param {Array}
 * @returns {boolean}
 */
const hasLodgings = allPass([complement(isNilOrEmpty), all(hasAdults)]);

/**
 * Get search selector
 *
 * @param {object}
 * @returns {object}
 */
export const getSearch = prop('search');

/**
 * Get search status selector
 *
 * @param {object}
 * @returns {string}
 */
export const getSearchStatus = createSelector(
  [getSearch, getArg(1)],
  (search, type) =>
    pipe(
      getStatus,
      prop(type)
    )(search)
);

/**
 * Get search data selector
 *
 * @param {object}
 * @returns {*}
 */
export const getSearchData = pipe(
  getSearch,
  getData
);

/**
 * Get search results selector
 *
 * @param {object}
 * @returns {object}
 */
export const getSearchResults = curry((state, type) =>
  pipe(
    getSearchData,
    propOr({}, type)
  )(state)
);

/**
 * Get search results meta selector
 *
 * @param {object}
 * @returns {object}
 */
export const getSearchResultsMeta = pipe(
  getSearchResults,
  prop('meta')
);

/**
 * Get search results meta selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getSearchResultsResult = pipe(
  getSearchResults,
  prop('result')
);

/**
 * Get search query selector
 *
 * @param {object}
 * @returns {object}
 */
export const getSearchQuery = pipe(
  getSearch,
  propOr({}, 'query')
);

/**
 * Get base search query selector
 *
 * @param {object}
 * @returns {object}
 */
export const getBaseSearchQuery = pipe(
  getSearchQuery,
  pick(['dates', 'lodging', 'repeatGuest', 'destination'])
);

/**
 * Get search value selector
 *
 * @param {object}
 * @returns {string}
 */
export const getSearchValue = pipe(
  getSearchQuery,
  path(['search', 'value'])
);

/**
 * Get search dates selector
 *
 * @param {object}
 * @returns {object}
 */
export const getSearchDates = createSelector(
  getSearchQuery,
  pipe(
    prop('dates'),
    renameKeys({ from: 'startDate', to: 'endDate' }),
    evolve(searchDatesTransformations)
  )
);

/**
 * Get search lodgings selector
 *
 * @param {object}
 * @returns {*}
 */
export const getSearchLodgings = createSelector(
  getSearchQuery,
  prop('lodging')
);

/**
 * Get search meal plan selector
 *
 * @param {object}
 * @returns {object}
 */
export const getSearchMealPlan = createSelector(
  getSearchQuery,
  path(['filters', 'mealPlan'])
);

/**
 * Get search filters regions selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getSearchFiltersRegions = createSelector(
  getSearchResultsMeta,
  pathOr([], ['filters', 'regions'])
);

/**
 * Get search filters star ratings selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getSearchFiltersStarRatings = createSelector(
  getSearchResultsMeta,
  pathOr([], ['filters', 'starRatings'])
);

/**
 * Get search filters features selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getSearchFiltersFeatures = createSelector(
  getSearchResultsMeta,
  pathOr([], ['filters', 'amenities'])
);

/**
 * Get search filters prices selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getSearchFiltersPrices = createSelector(
  getSearchResultsMeta,
  pathOr([], ['filters', 'prices'])
);

/**
 * Get search occassions selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getSearchOccassions = createSelector(
  getSearchResultsMeta,
  propOr(values(Occassions), 'occasions')
);

/**
 * Get can search selector
 *
 * @param {object}
 * @returns {boolean}
 */
export const getCanSearch = createSelector(
  getSearchQuery,
  ({ dates, lodging }) => {
    const datesExist = hasDates(dates);
    const lodgingsExist = hasLodgings(lodging);

    return and(datesExist, lodgingsExist);
  }
);

export const getMappedSearchResults = createSelector(
  [getArg(0), getSearchResultsResult],
  (state, results) =>
    evolve({
      countries: pipe(
        map(partial(getCountry, [state])),
        reject(isNilOrEmpty)
      ),
      hotels: pipe(
        map(partial(getHotel, [state])),
        reject(isNilOrEmpty)
      ),
    })(results)
);

// Proper selectors

const searchDomain = state => state.search;

export const optionsPendingSelector = createSelector(
  searchDomain,
  search => search.optionsPending
);

export const optionsErrorSelector = createSelector(
  searchDomain,
  search => search.optionsPending
);

export const hasOptionsErrorSelector = createSelector(
  optionsErrorSelector,
  Boolean
);

export const optionsSelector = createSelector(
  searchDomain,
  search => search.options
);

export const searchFiltersSelector = createSelector(
  optionsSelector,
  propOr([], 'filters')
);

export const searchRegionsSelector = createSelector(
  optionsSelector,
  propOr([], 'regions')
);

export const searchStarRatingsSelector = createSelector(
  optionsSelector,
  propOr([], 'starRatings')
);
