import { history } from 'utils/history';
import { path, prop, pipe, pick, lensPath, lensProp, over, map, when, complement, isNil, identity } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import { getQuery, parseJson } from 'utils';

import { setSearchQuery, SEARCH_BY_QUERY } from './actions';

const datesFromLens = lensPath(['dates', 'startDate']);
const datesToLens = lensPath(['dates', 'endDate']);
const lodgingLens = lensProp('lodging');
const occasionsLens = lensProp('occasions');
const repeatGuestLens = lensProp('repeatGuest');
const filtersRegionsLens = lensPath(['filters', 'regions', 'selected']);
const filtersPricesLens = lensPath(['filters', 'prices']);
const filtersStarRatingsLens = lensPath(['filters', 'starRatings']);
const filtersFeaturesLens = lensPath(['filters', 'features']);

/**
 * New date
 *
 * @param {string} value
 * @returns {Date}
 */
const newDate = value => value && new Date(value);

/**
 * To boolean
 *
 * @param {string} value
 * @returns {Boolean}
 */
const toBoolean = value => value && value === 'true';

/**
 * Is not nil
 *
 * @param {*}
 * @returns {boolean}
 */
const isNotNil = complement(isNil);

/**
 * Map numbers
 *
 * @param {*}
 * @returns {Array<Number>}
 */
const mapNumbers = when(isNotNil, map(Number));

/**
 * Map numbers
 *
 * @param {*}
 * @returns {Array<Boolean>}
 */
const mapSelected = when(isNotNil, map(toBoolean));

/**
 * Format data
 *
 * Normalize data from query string/local storage
 *
 * @param {object}
 * @returns {object}
 */
const formatData = pipe(
  over(datesFromLens, newDate),
  over(datesToLens, newDate),
  over(lodgingLens, identity),
  over(repeatGuestLens, identity),
  over(occasionsLens, mapSelected),
  over(filtersRegionsLens, mapSelected),
  over(filtersStarRatingsLens, mapSelected),
  over(filtersPricesLens, mapNumbers),
  over(filtersFeaturesLens, mapSelected)
);

/**
 * From local storage
 *
 * Extracts key from local storage and formats
 *
 * @param {string}
 * @returns {object}
 */
const fromLocalStorage = pipe(
  // Ramda can't invoke getItem properly without the browser throwing a fit
  key => localStorage.getItem(key),
  parseJson,
  formatData
);

/**
 * Get search query
 *
 * @param {object}
 * @returns {object}
 */
const getSearchQuery = pipe(
  prop('location'),
  getQuery,
  when(
    complement(isNilOrEmpty),
    pipe(
      // Keys that can be picked out of the query
      pick(['lodging', 'destination', 'dates', 'suitableForHoneymooners', 'filters', 'occasions', 'repeatGuest']),
      formatData
    )
  )
);

const searchMiddleware = ({ getState }) => next => action => {
  const state = getState();
  const localSearch = fromLocalStorage(SEARCH_BY_QUERY);
  const querySearch = getSearchQuery(history);

  const searchFromQuery = !isNilOrEmpty(querySearch);
  const searchFromStorage = !isNilOrEmpty(localSearch);

  // Populate the search keys from either local storage or query string
  if (isNilOrEmpty(path(['search', 'query'], state)) && (searchFromQuery || searchFromStorage)) {
    // Query takes precedence over local storage
    const nextSearch = (searchFromQuery && querySearch) || (searchFromStorage && localSearch);
    nextSearch && next(setSearchQuery(nextSearch));
  }

  next(action);
};

export default searchMiddleware;
