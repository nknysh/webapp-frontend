import { createBrowserHistory } from 'history';
import { path, prop, pipe, pick, isEmpty, lensPath, lensProp, over, map } from 'ramda';

import { getQuery } from 'utils';

import { setSearchQuery } from './actions';

const history = createBrowserHistory();

const datesFromLens = lensPath(['dates', 'from']);
const datesToLens = lensPath(['dates', 'to']);
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('honeymooners');

const newDate = value => value && new Date(value);

const mapNumbers = map(Number);

const formatData = pipe(
  over(datesFromLens, newDate),
  over(datesToLens, newDate),
  over(lodgingLens, mapNumbers),
  over(honeymoonersLens, Boolean)
);

const getSearchQuery = pipe(
  prop('location'),
  getQuery,
  pick(['lodging', 'search', 'dates', 'honeymooners'])
);

const searchMiddleware = ({ getState }) => next => action => {
  const state = getState();
  const search = getSearchQuery(history);

  const populateSearch = pipe(
    formatData,
    setSearchQuery,
    next
  );

  // If the redux key is empty but there is a search in the
  // query string, then populate the redux store with it
  if (!path(['search', 'query'], state) && !isEmpty(search)) next(populateSearch(search));

  next(action);
};

export default searchMiddleware;
