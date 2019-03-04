import lunr from 'lunr';
import { map } from 'ramda';

import { createReducer } from 'store/utils';

import { SEARCH_INDEX_BUILD, SET_SEARCH_QUERY } from './actions';

function newIndex(ref, fields = [], data = []) {
  return lunr(function() {
    this.ref(ref);

    const buildField = field => this.field(field);
    const addDoc = doc => this.add(doc);

    map(buildField, fields);
    map(addDoc, data);
  });
}

const initialState = {
  indexes: {
    destinations: newIndex('destinations'),
    hotels: newIndex('hotels'),
  },
  query: undefined,
};

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

const setSearchQuery = (state, { payload }) => {
  return {
    ...state,
    query: {
      ...payload,
    },
  };
};

export default createReducer(
  {
    [SEARCH_INDEX_BUILD]: buildSearchIndex,
    [SET_SEARCH_QUERY]: setSearchQuery,
  },
  initialState
);
