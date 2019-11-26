import { buildQueryString } from 'utils';

import client from './index';

/**
 * Get search
 *
 * Main search endpoint for full search
 *
 * @param {object} query
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getSearch = (query, params, opts) => {
  return client.get(`/search?${buildQueryString(query)}`, { params, ...opts });
};

/**
 * Get search by name
 *
 * Searchs by name only
 *
 * @param {string} term
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getSearchByName = (term, params, opts) =>
  client.get(`/search/names/${encodeURI(term)}`, { params, ...opts });

export const getOptions = () => client.get(`/search/options`);

export default { getSearch, getSearchByName, getOptions };
