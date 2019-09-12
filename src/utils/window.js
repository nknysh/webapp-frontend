import { __, lte, path } from 'ramda';

import { theme } from 'styles';

export const windowExists = typeof window !== 'undefined' ? window : {};

/**
 * Add event
 *
 * @param {Event | object | string} event
 * @param {Function} callback
 * @param {object} context
 */
export const addEvent = (event, callback, context = windowExists) => {
  if (context.addEventListener) {
    context.addEventListener(event, callback);
  }
};

/**
 * Remove event
 *
 * @param {Event | object | string} event
 * @param {Function} callback
 * @param {object} context
 */
export const removeEvent = (event, callback, context = windowExists) => {
  if (context.removeEventListener) {
    context.removeEventListener(event, callback);
  }
};

/**
 * Is mobile
 *
 * Checks if the passed in value is less than tablet breakpoint
 *
 * @param {number}
 * @returns {boolean}
 */
export const isMobile = lte(__, path(['breakpointSizes', 'tablet'], theme));
