import { __, pipe, prop } from 'ramda';

import currencies from 'config/data/currencies';

/**
 * Get currency
 *
 * Returns currency from config
 *
 * @param {string}
 * @returns {object}
 */
export const getCurrency = prop(__, currencies);

/**
 * Get currency symbol
 *
 * Returns just the currency symbol
 *
 * @param {string}
 * @returns {string}
 */
export const getCurrencySymbol = pipe(getCurrency, prop('symbol'));
