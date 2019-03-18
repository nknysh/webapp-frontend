import { propOr, pathOr, prop, pipe, path } from 'ramda';

import {
  filterByRange,
  filterByArrayValues,
  queryAvailable,
  queryFilterRegions,
  queryFilterStarRatings,
  queryHoneymooners,
  queryPreferred,
  querySearchType,
  searchByQueries,
  toList,
} from 'utils';

import { getHotel, getHotelRegions } from 'store/modules/hotels/selectors';
import { successAction } from 'store/common/actions';

import { getSearchIndex, getSearchQuery } from './selectors';

export const SEARCH_INDEX_BUILD = 'SEARCH_INDEX_BUILD';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const RESET_SEARCH_FILTERS = 'RESET_SEARCH_FILTERS';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';

const buildSearchQueries = (searchQuery, { regions }) =>
  toList(
    queryAvailable(),
    queryPreferred(),
    queryHoneymooners(searchQuery),
    querySearchType(propOr({}, 'search', searchQuery)),
    queryFilterRegions(pathOr({}, ['filters', 'regions'], searchQuery), regions),
    queryFilterStarRatings(pathOr({}, ['filters', 'starRatings'], searchQuery))
  );

export const buildIndex = payload => ({
  type: SEARCH_INDEX_BUILD,
  payload,
});

export const setSearchQueryAction = payload => ({
  type: SET_SEARCH_QUERY,
  payload,
});

export const resetFiltersAction = payload => ({
  type: RESET_SEARCH_FILTERS,
  payload,
});

export const searchResults = payload => ({
  type: SEARCH_RESULTS,
  payload,
});

export const resetFilters = payload => dispatch => {
  dispatch(resetFiltersAction(payload));

  const index = prop('index', payload);
  index && dispatch(fetchSearchResults({ index }));
};

export const setSearchQuery = ({ index, ...payload }) => dispatch => {
  dispatch(setSearchQueryAction(payload));
  dispatch(fetchSearchResults({ index }));
};

export const fetchSearchResults = payload => (dispatch, getState) => {
  dispatch(searchResults(payload));
  const state = getState();

  const indexName = prop('index', payload);
  const index = getSearchIndex(state, indexName);

  if (!indexName || !index) return;

  const query = getSearchQuery(state);
  const queries = buildSearchQueries(query, { regions: getHotelRegions(state) });

  const getResults = pipe(
    searchByQueries,
    filterByRange(getHotel(state), pathOr([], ['filters', 'prices'], query), 'listPrice'),
    filterByArrayValues(getHotel(state), pathOr([], ['filters', 'features'], query), 'amenities'),
    filterByArrayValues(getHotel(state), { [path(['filters', 'mealPlan'], query)]: true }, 'mealPlans')
  );

  const results = getResults(index, queries);

  dispatch(successAction(SEARCH_RESULTS, results));
};
