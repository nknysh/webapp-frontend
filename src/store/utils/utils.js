import { curry, lensProp, pipe, identity, defaultTo } from 'ramda';

import { Status } from 'store/common/status';

/**
 * Status lens
 *
 * @param {object}
 * @returns {Function}
 */
export const statusLens = lensProp('status');

/**
 * Error lens
 *
 * @param {object}
 * @returns {Function}
 */
export const errorLens = lensProp('error');

/**
 * Data lens
 *
 * @param {object}
 * @returns {Function}
 */
export const dataLens = lensProp('data');

/**
 * Build action name
 *
 * Curried function that builds a string from the status
 * and the action type
 *
 * @param {string} status
 * @param {string} type
 * @returns {Function | string}
 */
const buildActionName = curry((status, type) => `${type}_${status}`);

/**
 * Get idle action name
 *
 * @param {string}
 * @returns {Function}
 */
export const getIdleActionName = buildActionName(Status.IDLE);

/**
 * Get loading action name
 *
 * @param {string}
 * @returns {Function}
 */
export const getLoadingActionName = buildActionName(Status.LOADING);

/**
 * Get success action name
 *
 * @param {string}
 * @returns {Function}
 */
export const getSuccessActionName = buildActionName(Status.SUCCESS);

/**
 * Get error action name
 *
 * @param {string}
 * @returns {Function}
 */
export const getErrorActionName = buildActionName(Status.ERROR);

/**
 * Reducer shim
 *
 * Returns a function that is essentially a stub.  Will always
 * return whats in the redux key, or default to `{}`
 *
 * @param {object}
 * @returns {object}
 */
export const reducerShim = pipe(
  identity,
  defaultTo({})
);
