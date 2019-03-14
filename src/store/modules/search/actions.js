import { propOr, pathOr, prop, pipe } from 'ramda';

import {
  toList,
  queryFilterRegions,
  querySearchType,
  queryPreferred,
  queryHoneymooners,
  queryAvailable,
  searchByQueries,
  filterByRange,
} from 'utils';

import { getHotel, getHotelRegions } from 'store/modules/hotels/selectors';

import { getSearchIndex, getSearchQuery } from './selectors';

export const SEARCH_INDEX_BUILD = 'SEARCH_INDEX_BUILD';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const RESET_SEARCH_FILTERS = 'RESET_SEARCH_FILTERS';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';

const buildSearchQueries = (searchQuery, { regions }) =>
  toList(
    queryFilterRegions(pathOr({}, ['filters', 'regions'], searchQuery), regions),
    querySearchType(propOr({}, 'search', searchQuery)),
    queryPreferred(),
    queryHoneymooners(searchQuery),
    queryAvailable()
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

export const resetFilters = payload => dispatch => {
  dispatch(resetFiltersAction(payload));

  const index = prop('index', payload);
  index && dispatch(fetchHotelsSearchResults({ index }));
};

export const searchResults = payload => ({
  type: SEARCH_RESULTS,
  payload,
});

export const setSearchQuery = ({ index = 'hotels', ...payload }) => dispatch => {
  dispatch(setSearchQueryAction(payload));
  dispatch(fetchHotelsSearchResults({ index }));
};

export const fetchHotelsSearchResults = payload => (dispatch, getState) => {
  const state = getState();

  const indexName = prop('index', payload);
  const index = getSearchIndex(state, indexName);

  if (!indexName || !index) return dispatch(searchResults([]));

  const query = getSearchQuery(state);
  const queries = buildSearchQueries(query, { regions: getHotelRegions(state) });

  const getResults = pipe(
    searchByQueries,
    filterByRange(getHotel(state), pathOr([], ['filters', 'prices'], query), 'listPrice')
  );

  const results = getResults(index, queries);

  dispatch(searchResults(results));
};
