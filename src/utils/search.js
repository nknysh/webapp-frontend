import { join, curry } from 'ramda';

/**
 * Search by queries
 *
 * Curried function to search on a lunr index
 *
 * @param {object}
 * @returns {*}
 */
export const searchByQueries = curry((index, queries = []) => index.search(join(' ', queries)));
