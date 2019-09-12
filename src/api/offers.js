import client from './index';

/**
 * Get latest offers
 *
 * Returns a list of latest offers
 *
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getLatestOffers = (params, opts) => client.get('/offers/latest', { params, ...opts });

export default { getLatestOffers };
