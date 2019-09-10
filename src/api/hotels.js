import client from './index';

/**
 * Get hotels
 *
 * Get list of hotels
 *
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getHotels = (params, opts) => client.get('/hotels', { params, ...opts });

/**
 * Get hotel
 *
 * Get single hotel
 *
 * @param {string} id
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getHotel = (id, params, opts) => client.get(`/hotels/${id}`, { params, ...opts });

/**
 * Get hotel room rates
 *
 * Returns the rates for dates of a room
 *
 * @param {string} id
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getHotelRoomRates = (id, params, opts) =>
  client.get(`/accommodation-products/${id}/best-rates`, { params, ...opts });

export default { getHotels, getHotel, getHotelRoomRates };
