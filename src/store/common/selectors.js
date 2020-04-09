import { prop, pipe } from 'ramda';

/**
 * Get status
 *
 * @param {object}
 * @returns {string}
 */
export const getStatus = prop('status');

/**
 * Get data
 *
 * @param {object}
 * @returns {*}
 */
export const getData = prop('data');

/**
 * Get error
 *
 * @param {object}
 * @returns {*}
 */
export const getErrors = prop('error');

/**
 * Get entities
 *
 * @param {object}
 * @returns {object}
 */
export const getEntities = pipe(getData, prop('entities'));

/**
 * Get results
 *
 * @param {object}
 * @returns {object | string | array}
 */
export const getResults = pipe(getData, prop('result'));

/**
 * Get arg
 *
 * Returns the arg from the args list.
 * Useful for functional selectors
 *
 * @param {number} i
 * @returns {*}
 */
export const getArg = i => (...args) => prop(i, args);
