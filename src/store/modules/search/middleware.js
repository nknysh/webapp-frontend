import { createBrowserHistory } from 'history';
import { path, prop, pipe, pick, isEmpty, lensPath, lensProp, over, map, when, complement, isNil } from 'ramda';

import { getQuery } from 'utils';

import { setSearchQueryAction } from './actions';

const history = createBrowserHistory();

const datesFromLens = lensPath(['dates', 'from']);
const datesToLens = lensPath(['dates', 'to']);
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('honeymooners');
const filtersRegionsLens = lensPath(['filters', 'regions', 'selected']);
const filtersPricesLens = lensPath(['filters', 'prices']);
const filtersStarRatingsLens = lensPath(['filters', 'starRatings']);

const newDate = value => value && new Date(value);

const toBoolean = value => value === 'true';

const isNotNil = complement(isNil);

const mapNumbers = when(isNotNil, map(Number));
const mapRegionSelected = when(isNotNil, map(toBoolean));

const formatData = pipe(
  over(datesFromLens, newDate),
  over(datesToLens, newDate),
  over(lodgingLens, mapNumbers),
  over(honeymoonersLens, toBoolean),
  over(filtersRegionsLens, mapRegionSelected),
  over(filtersStarRatingsLens, mapRegionSelected),
  over(filtersPricesLens, mapNumbers)
);

const getSearchQuery = pipe(
  prop('location'),
  getQuery,
  pick(['lodging', 'search', 'dates', 'honeymooners', 'filters', 'starRatings']),
  formatData
);

const searchMiddleware = ({ getState }) => next => action => {
  const state = getState();
  const search = getSearchQuery(history);

  // If the redux key is empty but there is a search in the
  // query string, then populate the redux store with it
  if (!path(['search', 'query'], state) && !isEmpty(search)) {
    next(setSearchQueryAction(search));
  }

  next(action);
};

export default searchMiddleware;
