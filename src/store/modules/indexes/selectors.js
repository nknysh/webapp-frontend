import lunr from 'lunr';
import { prop, pipe, curry, when, complement, isNil, invoker } from 'ramda';

const loadIndex = pipe(
  invoker(0, 'toJSON'),
  lunr.Index.load
);

export const getIndexes = prop('indexes');

export const getIndexesStatus = pipe(
  getIndexes,
  prop('status')
);

export const getIndexesData = pipe(
  getIndexes,
  prop('data')
);

export const getSearchIndexes = pipe(
  getIndexes,
  prop('indexes')
);

export const getIndex = curry((state, index) =>
  pipe(
    getSearchIndexes,
    prop(index),
    when(complement(isNil), loadIndex)
  )(state)
);

export const getIndexResults = curry((state, index) =>
  pipe(
    getIndexesData,
    prop(index)
  )(state)
);
