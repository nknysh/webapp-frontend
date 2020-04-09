import lunr from 'lunr';
import { prop, pipe, curry, when, complement, isNil, invoker } from 'ramda';

/**
 * Load index
 *
 * Reinitializes an index that has been serialized
 *
 * @param {object}
 * @returns {object}
 */
const loadIndex = pipe(invoker(0, 'toJSON'), lunr.Index.load);

/**
 * Get indexes selector
 *
 * @param {object}
 * @returns {object}
 */
export const getIndexes = prop('indexes');

/**
 * Get indexes status selector
 *
 * @param {object}
 * @returns {string}
 */
export const getIndexesStatus = pipe(getIndexes, prop('status'));

/**
 * Get indexes data selector
 *
 * @param {object}
 * @returns {*}
 */
export const getIndexesData = pipe(getIndexes, prop('data'));

/**
 * Get search indexes selector
 *
 * @param {object}
 * @returns {object}
 */
export const getSearchIndexes = pipe(getIndexes, prop('indexes'));

/**
 * Get index selector
 *
 * @param {object} state
 * @param {string} index
 * @returns {object}
 */
export const getIndex = curry((state, index) =>
  pipe(getSearchIndexes, prop(index), when(complement(isNil), loadIndex))(state)
);

/**
 * Get index results selector
 *
 * @param {object} state
 * @param {string} index
 * @returns {object}
 */
export const getIndexResults = curry((state, index) => pipe(getIndexesData, prop(index))(state));
