import lunr from 'lunr';
import { prop, pipe, curry, when, complement, isNil, invoker, values } from 'ramda';

export const getSearch = prop('search');

export const getSearchIndexes = pipe(
  getSearch,
  prop('indexes')
);

export const getSearchStatus = pipe(
  getSearch,
  prop('status')
);

export const getSearchResults = pipe(
  getSearch,
  prop('data'),
  values
);

export const getSearchQuery = pipe(
  getSearch,
  prop('query')
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
