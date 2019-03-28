import { pipe, mergeDeepRight, propOr } from 'ramda';

import { initialState, successResetReducer, loadingReducer, successReducer } from 'store/common';
import { createReducer, getSuccessActionName, normalizer } from 'store/utils';

import { SET_SEARCH_QUERY, RESET_SEARCH_FILTERS, SEARCH_RESULTS, FETCH_SEARCH } from './actions';

const searchState = {
  ...initialState,
  query: undefined,
};

const setSearchQuery = (state, { payload }) => ({
  ...state,
  query: {
    ...mergeDeepRight(propOr({}, 'query', state), payload),
  },
});

export const resetFilters = state => ({
  ...state,
  query: {
    ...state.query,
    filters: {},
  },
});

export const searchResults = (state, { payload }) => ({
  ...state,
  results: payload,
});

export default createReducer(
  {
    [SET_SEARCH_QUERY]: setSearchQuery,
    [RESET_SEARCH_FILTERS]: resetFilters,
    [SEARCH_RESULTS]: loadingReducer,
    [getSuccessActionName(SEARCH_RESULTS)]: pipe(
      successResetReducer,
      normalizer('ref')
    ),
    [FETCH_SEARCH]: loadingReducer,
    [getSuccessActionName(FETCH_SEARCH)]: successReducer,
  },
  searchState
);
