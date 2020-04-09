import { pipe, propOr } from 'ramda';
import qs from 'qs';

const qsConfig = {
  ignoreQueryPrefix: true,
};

/**
 * Parse query string
 *
 * @param {string} search
 * @returns {object}
 */
export const parseQueryString = search => qs.parse(search, qsConfig);

/**
 * Build query string
 *
 * @param {object} search
 * @returns {string}
 */
export const buildQueryString = search => qs.stringify(search);

/**
 * Get query
 *
 * Returns query string from `location` object
 *
 * @param {object}
 * @returns {*}
 */
export const getQuery = pipe(propOr('', 'search'), parseQueryString);
