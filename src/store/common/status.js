import { equals, anyPass } from 'ramda';

export const Status = Object.freeze({
  LOADING: 'LOADING',
  IDLE: 'IDLE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  SENDING: 'SENDING',
});

/**
 * Is idle
 *
 * @param {string}
 * @returns {boolean}
 */
export const isIdle = equals(Status.IDLE);

/**
 * Is loading
 *
 * @param {string}
 * @returns {boolean}
 */
export const isLoading = equals(Status.LOADING);

/**
 * Is error
 *
 * @param {string}
 * @returns {boolean}
 */
export const isError = equals(Status.ERROR);

/**
 * Is success
 *
 * @param {string}
 * @returns {boolean}
 */
export const isSuccess = equals(Status.SUCCESS);

/**
 * Is sending
 *
 * @param {string}
 * @returns {boolean}
 */
export const isSending = equals(Status.SENDING);

/**
 * Is active
 *
 * @param {string}
 * @returns {boolean}
 */
export const isActive = anyPass([isLoading, isSending]);
