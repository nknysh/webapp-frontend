import { propOr, prop, path, omit, curry } from 'ramda';
import { normalize } from 'normalizr';

import { IndexTypes } from 'utils';

import client from 'api/search';

import { successAction, errorAction, setNormalizedData } from 'store/common';
import { searchIndex } from 'store/modules/indexes/actions';

import schema from './schema';
import { getSearchValue } from './selectors';

export const SEARCH_INDEX_BUILD = 'SEARCH_INDEX_BUILD';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const RESET_SEARCH_FILTERS = 'RESET_SEARCH_FILTERS';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const FETCH_SEARCH = 'FETCH_SEARCH';

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

export const fetchSearchAction = payload => ({
  type: FETCH_SEARCH,
  payload,
});

export const resetFilters = payload => dispatch => {
  dispatch(resetFiltersAction(payload));

  const index = prop('index', payload);
  index && dispatch(searchIndex(index));
};

export const setSearchQuery = ({ index = IndexTypes.HOTELS, ...payload }) => dispatch => {
  dispatch(setSearchQueryAction(payload));
  dispatch(searchIndex(index));
};

export const searchByRoomDates = async (name, {dates}, roomId) => (dispatch, getState) => {
  console.log('hit', name, dates, roomId);
}

export const fetchSearch = ({ value, index = IndexTypes.HOTELS }) => (dispatch, getState) => {
  const payload = { name: value };

  const state = getState();
  const searchValue = getSearchValue(state);

  dispatch(fetchSearchAction(payload));

  client
    .getSearch(payload, { name: searchValue })
    .then(({ data: { data } }) => {
      const normalized = normalize({ id: 'search', ...data }, prop('schema', schema));

      setNormalizedData(dispatch, propOr({}, 'relationships', schema), normalized);

      const ids = omit(['id'], path(['entities', 'results', 'search'], normalized));
      dispatch(searchIndex(index));
      dispatch(successAction(FETCH_SEARCH, ids));
    })
    .catch(error => dispatch(errorAction(FETCH_SEARCH, error)));
};
