import { createBrowserHistory } from 'history';
import { path, prop, pipe, pick, lensPath, lensProp, over, map, when, complement, isNil, identity } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import { getQuery } from 'utils';

import { setSearchQuery } from './actions';

const history = createBrowserHistory();

const datesFromLens = lensPath(['dates', 'from']);
const datesToLens = lensPath(['dates', 'to']);
const lodgingLens = lensProp('lodging');
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
  over(honeymoonersLens, toBoolean),
  over(filtersRegionsLens, mapSelected),
  over(filtersStarRatingsLens, mapSelected),
  over(filtersPricesLens, mapNumbers),
  over(filtersFeaturesLens, mapSelected)
);

const getSearchQuery = pipe(
  prop('location'),
  getQuery,
  pick(['lodging', 'destination', 'dates', 'suitableForHoneymooners', 'filters']),
  formatData
);

const searchMiddleware = ({ getState }) => next => action => {
  const state = getState();
  const search = getSearchQuery(history);

  // If the redux key is empty but there is a search in the
  // query string, then populate the redux store with it
  if (isNilOrEmpty(path(['search', 'query'], state)) && !isNilOrEmpty(search)) {
    next(setSearchQuery(search));
  }

  next(action);
};

export default searchMiddleware;
