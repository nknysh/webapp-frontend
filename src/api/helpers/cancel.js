import { CancelToken, isCancel } from 'axios';

/**
 * Creates an axios cancel token
 *
 * @param {Promise} execute
 * @returns {*}
 */
export const createCancelToken = execute => (execute ? new CancelToken(execute) : CancelToken.source());

/**
 * Proxy axios isCancel func
 *
 * @returns {Function}
 */
export const wasCancelled = isCancel;
