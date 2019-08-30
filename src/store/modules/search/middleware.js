import { createBrowserHistory } from 'history';
import { path, prop, pipe, pick, lensPath, lensProp, over, map, when, complement, isNil, identity } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import { getQuery, parseJson } from 'utils';

import { setSearchQuery, SEARCH_BY_QUERY } from './actions';

const history = createBrowserHistory();

const datesFromLens = lensPath(['dates', 'startDate']);
const datesToLens = lensPath(['dates', 'endDate']);
const lodgingLens = lensProp('lodging');
const occasionsLens = lensProp('occasions');
const repeatGuestLens = lensProp('repeatGuest');
const honeymoonersLens = lensProp('suitableForHoneymooners');
const filtersRegionsLens = lensPath(['filters', 'regions', 'selected']);
const filtersPricesLens = lensPath(['filters', 'prices']);
const filtersStarRatingsLens = lensPath(['filters', 'starRatings']);
const filtersFeaturesLens = lensPath(['filters', 'features']);

const newDate = value => value && new Date(value);
const toBoolean = value => value && value === 'true';

const isNotNil = complement(isNil);

const mapNumbers = when(isNotNil, map(Number));
const mapSelected = when(isNotNil, map(toBoolean));

const formatData = pipe(
  over(datesFromLens, newDate),
  over(datesToLens, newDate),
  over(lodgingLens, identity),
  over(repeatGuestLens, identity),
  over(occasionsLens, mapSelected),
  over(honeymoonersLens, toBoolean),
  over(filtersRegionsLens, mapSelected),
  over(filtersStarRatingsLens, mapSelected),
  over(filtersPricesLens, mapNumbers),
  over(filtersFeaturesLens, mapSelected)
);

const fromLocalStorage = pipe(
  // Ramda can't invoke getItem properly without the browser throwing a fit
  key => localStorage.getItem(key),
  parseJson,
  formatData
);

const getSearchQuery = pipe(
  prop('location'),
  getQuery,
  when(
    complement(isNilOrEmpty),
    pipe(
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
    const nextSearch = (searchFromQuery && querySearch) || (searchFromStorage && localSearch);
    nextSearch && next(setSearchQuery(nextSearch));
  }

  next(action);
};

export default searchMiddleware;
