import { pipe, set, propOr, values, map, mergeDeepRight } from 'ramda';

import { isArray } from 'utils/helpers';
import { statusLens, errorLens, dataLens } from 'store/utils';

import { Status } from './status';

/**
 * Idle reducer
 *
 * Sets status to IDLE and clears errors
 *
 * @param {object}
 * @returns {object}
 */
export const idleReducer = pipe(
  set(statusLens, Status.IDLE),
  set(errorLens, undefined)
);

/**
 * Loading reducer
 *
 * Sets status to LOADING and clears errors
 *
 * @param {object}
 * @returns {object}
 */
export const loadingReducer = pipe(
  set(statusLens, Status.LOADING),
  set(errorLens, undefined)
);

/**
 * Sending reducer
 *
 * Sets status to SENDING and clears errors
 *
 * @param {object}
 * @returns {object}
 */
export const sendingReducer = pipe(
  set(statusLens, Status.SENDING),
  set(errorLens, undefined)
);

/**
 * Success reducer
 *
 * @param {object} state
 * @param {object}
 */
export const successReducer = (state, { payload }) => {
  const prevData = propOr([], 'data', state);

  /**
   * Set data
   *
   * Sets status to SUCCESS, replaces the data with new data
   * merging any old data in the process. Clears errors
   *
   * @param {object}
   * @returns {object}
   */
  const setData = pipe(
    set(statusLens, Status.SUCCESS),
    set(dataLens, isArray(payload) ? [...values(prevData), ...payload] : mergeDeepRight(prevData, payload)),
    set(errorLens, undefined)
  );

  return setData(state);
};

/**
 * Error reducer
 *
 * @param {object} state
 * @param {object}
 */
export const errorReducer = (state, { payload }) => {
  const prevData = propOr([], 'data', state);

  /**
   * Set data
   *
   * Sets status to ERROR, replaces the data with previous data
   * and adds errors to errors key
   *
   * @param {object}
   * @returns {object}
   */
  const setData = pipe(
    set(statusLens, Status.ERROR),
    set(dataLens, prevData),
    set(errorLens, isArray(payload) ? [...payload] : payload)
  );

  return setData(state);
};

/**
 * Success reset reducer
 *
 * @param {object} state
 * @param {object}
 */
export const successResetReducer = (state, { payload }) => {
  /**
   * Set data
   *
   * Sets status to SUCCESS, replaces the data with new data (old data
   * will be lost). Clears errors
   *
   * @param {object}
   * @returns {object}
   */
  const setData = pipe(
    set(statusLens, Status.SUCCESS),
    set(dataLens, payload),
    set(errorLens, undefined)
  );

  return setData(state);
};

/**
 * Reset store statuses
 *
 * Resets all the statuses in the store to IDLE
 *
 * @param {object} state
 * @returns {object}
 */
export const resetStoreStatuses = state => {
  const setStatusToIdle = set(statusLens, Status.IDLE);
  return map(setStatusToIdle, state);
};
