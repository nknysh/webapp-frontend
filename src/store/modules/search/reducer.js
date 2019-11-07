import { mergeDeepRight, pipe, assocPath, set, propOr } from 'ramda';

import { initialState, Status, STORE_RESET, STATUS_TO_IDLE } from 'store/common';
import { createReducer, getSuccessActionName, getLoadingActionName, getErrorActionName } from 'store/utils';
import { errorLens, dataLens } from 'store/utils';

import { isArray } from 'utils';

import {
  SEARCH_BY_NAME,
  SEARCH_BY_QUERY,
  SEARCH_QUERY_UPDATE,
  SEARCH_QUERY_RESET,
  SEARCH_FILTERS_RESET,
  SEARCH_OPTIONS_REQUEST,
  SEARCH_OPTIONS_SUCCESS,
  SEARCH_OPTIONS_FAILURE,
} from './actions';

const searchState = {
  ...initialState,
  status: {
    byName: Status.IDLE,
    byQuery: Status.IDLE,
  },
  query: undefined,

  optionsPending: null,
  optionsError: null,
  options: null,
};

/**
 * Set search query reducer
 *
 * @param {object} state
 * @param {object}
 * @returns {object}
 */
const setSearchQuery = (state, { payload }) =>
  mergeDeepRight(state, {
    query: payload,
  });

/**
 * Reset search query reducer
 *
 * @param {object} state
 * @param {object}
 * @returns {object}
 */
const resetSearchQuery = (state, { payload }) => ({
  ...state,
  query: payload,
});

/**
 * Search filters reset reducer
 *
 * @param {object} state
 * @returns {object}
 */
const searchFiltersReset = state => assocPath(['query', 'filters'], {}, state);

/**
 * Search results reducer
 *
 * @param {object} state
 * @param {object}
 * @returns {object}
 */
const searchResults = type => (state, { payload }) =>
  mergeDeepRight(state, {
    status: {
      [type]: Status.SUCCESS,
    },
    data: payload,
  });

/**
 * Remove local storage reducer
 *
 * @param {object} state
 * @returns {object}
 */
const removeLocalStorage = state => {
  localStorage.removeItem(SEARCH_BY_NAME);
  localStorage.removeItem(SEARCH_BY_QUERY);

  return state;
};

const searchLoading = type =>
  pipe(
    assocPath(['status', type], Status.LOADING),
    set(errorLens, undefined)
  );

const searchError = type => (state, { payload }) => {
  const prevData = propOr([], 'data', state);

  /**
   * Set data
   *
   * Sets status to ERROR, replaces the data with previous data
   * and adds errors to errors key
   *
   * @param {object}
   * @returns {object}
   */
  const setData = pipe(
    assocPath(['status', type], Status.ERROR),
    set(dataLens, prevData),
    set(errorLens, isArray(payload) ? [...payload] : payload)
  );

  return setData(state);
};

const statusesToIdle = mergeDeepRight({
  status: {
    byName: Status.IDLE,
    byQuery: Status.IDLE,
  },
});

const searchOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_OPTIONS_REQUEST:
      return {
        ...state,
        optionsPending: true,
        optionsError: null,
      };

    case SEARCH_OPTIONS_SUCCESS:
      return {
        ...state,
        optionsPending: false,
        optionsError: null,
        options: action.payload,
      };

    case SEARCH_OPTIONS_FAILURE:
      return {
        ...state,
        optionsPending: false,
        optionsError: action.payload,
      };

    default:
      return state;
  }
};

export default createReducer(
  {
    [getErrorActionName(SEARCH_BY_NAME)]: searchError('byName'),
    [getErrorActionName(SEARCH_BY_QUERY)]: searchError('byQuery'),
    [getLoadingActionName(SEARCH_BY_NAME)]: searchLoading('byName'),
    [getLoadingActionName(SEARCH_BY_QUERY)]: searchLoading('byQuery'),
    [getSuccessActionName(SEARCH_BY_NAME)]: searchResults('byName'),
    [getSuccessActionName(SEARCH_BY_QUERY)]: searchResults('byQuery'),
    [SEARCH_FILTERS_RESET]: searchFiltersReset,
    [SEARCH_QUERY_UPDATE]: setSearchQuery,
    [SEARCH_QUERY_RESET]: resetSearchQuery,
    [STORE_RESET]: removeLocalStorage,
    [STATUS_TO_IDLE]: statusesToIdle,
    [SEARCH_OPTIONS_REQUEST]: searchOptionsReducer,
    [SEARCH_OPTIONS_SUCCESS]: searchOptionsReducer,
    [SEARCH_OPTIONS_FAILURE]: searchOptionsReducer,
  },
  searchState
);
