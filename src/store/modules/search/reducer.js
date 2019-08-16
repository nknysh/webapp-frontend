import { mergeDeepRight, propOr, assocPath } from 'ramda';

import { initialState, loadingReducer, errorReducer, Status, STORE_RESET } from 'store/common';
import { createReducer, getSuccessActionName, getLoadingActionName, getErrorActionName } from 'store/utils';

import { SEARCH_BY_NAME, SEARCH_BY_QUERY, SEARCH_QUERY_UPDATE, SEARCH_FILTERS_RESET } from './actions';

const searchState = {
  ...initialState,
  query: undefined,
};

const setSearchQuery = (state, { payload }) =>
  mergeDeepRight(state, {
    query: payload,
  });

const searchFiltersReset = state => assocPath(['query', 'filters'], {}, state);

const searchResults = (state, { payload }) => ({
  ...state,
  status: Status.SUCCESS,
  data: { ...propOr({}, 'data', state), ...payload },
});

const removeLocalStorage = state => {
  localStorage.removeItem(SEARCH_BY_NAME);
  localStorage.removeItem(SEARCH_BY_QUERY);

  return state;
};

export default createReducer(
  {
    [SEARCH_QUERY_UPDATE]: setSearchQuery,
    [SEARCH_FILTERS_RESET]: searchFiltersReset,
    [getLoadingActionName(SEARCH_BY_NAME)]: loadingReducer,
    [getSuccessActionName(SEARCH_BY_NAME)]: searchResults,
    [getErrorActionName(SEARCH_BY_NAME)]: errorReducer,
    [getLoadingActionName(SEARCH_BY_QUERY)]: loadingReducer,
    [getSuccessActionName(SEARCH_BY_QUERY)]: searchResults,
    [getErrorActionName(SEARCH_BY_QUERY)]: errorReducer,
    [STORE_RESET]: removeLocalStorage,
  },
  searchState
);
