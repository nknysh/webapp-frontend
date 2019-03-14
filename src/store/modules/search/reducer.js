import lunr from 'lunr';
import { map } from 'ramda';

import { createReducer } from 'store/utils';

import { SEARCH_INDEX_BUILD, SET_SEARCH_QUERY, RESET_SEARCH_FILTERS, SEARCH_RESULTS } from './actions';

const initialState = {
  indexes: {
    countries: newIndex('countries'),
    hotels: newIndex('hotels'),
  },
  query: undefined,
  results: undefined,
};

function newIndex(ref, fields = [], data = []) {
  return lunr(function() {
    this.ref(ref);

    const buildField = field => this.field(field);
    const addDoc = doc => this.add(doc);

    map(buildField, fields);
    map(addDoc, data);
  });
}

const buildSearchIndex = (state, { payload: { index, ref, fields, data } }) => {
  const searchIndex = newIndex(ref, fields, data);

  return {
    ...state,
    indexes: {
      ...state.indexes,
      [index]: searchIndex,
    },
  };
};

const setSearchQuery = (state, { payload }) => ({
  ...state,
  query: {
    ...payload,
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
    [SEARCH_INDEX_BUILD]: buildSearchIndex,
    [SET_SEARCH_QUERY]: setSearchQuery,
    [RESET_SEARCH_FILTERS]: resetFilters,
    [SEARCH_RESULTS]: searchResults,
  },
  initialState
);
