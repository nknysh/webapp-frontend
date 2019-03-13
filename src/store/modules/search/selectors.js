import lunr from 'lunr';
import { prop, pipe, curry, when, complement, isNil, invoker } from 'ramda';

export const getSearch = prop('search');

export const getSearchIndexes = pipe(
  getSearch,
  prop('indexes')
);

export const getSearchQuery = pipe(
  getSearch,
  prop('query')
);

export const getSearchResults = pipe(
  getSearch,
  prop('results')
);

const loadIndex = pipe(
  invoker(0, 'toJSON'),
  lunr.Index.load
);

export const getSearchIndex = curry((state, index) =>
  pipe(
    getSearchIndexes,
    prop(index),
    when(complement(isNil), loadIndex)
  )(state)
);
