import client from './index';

/**
 * Amend booking
 *
 * Patch booking object
 *
 * @param {string} id
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const amendBooking = (id, body, params, opts) => client.patch(`/bookings/${id}`, body, { params, ...opts });

/**
 * Review booking
 *
 * Review booking endpoint for updating status etc.
 *
 * @param {string} id
 * @param {*} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const reviewBooking = (id, body, params, opts) =>
  client.post(`/bookings/${id}/review`, body, { params, ...opts });

/**
 * Booking builder
 *
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const bookingBuilder = (body, params, opts) => client.post('/booking-builder', body, { params, ...opts });

/**
 * Cancel booking
 *
 * @param {string} id
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const cancelBooking = (id, body, params, opts) =>
  client.post(`/bookings/${id}/cancel`, body, { params, ...opts });

/**
 * Create booking
 *
 * POST endpoint for booking
 *
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const createBooking = (body, params, opts) => client.post('/bookings', body, { params, ...opts });

/**
 * Get booking
 *
 * Get single booking
 *
 * @param {string} id
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getBooking = (id, params, opts) => client.get(`/bookings/${id}`, { params, ...opts });

/**
 * Get booking holds
 *
 * Returns holds for current booking ID
 *
 * @param {string} id
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getBookingHolds = (id, params, opts) => client.get(`/bookings/${id}/holds`, { params, ...opts });

/**
 * Hold booking
 *
 * Allows to hold products in the booking
 *
 * @param {string} id
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const holdBooking = (id, body, params, opts) => client.post(`/bookings/${id}/holds`, body, { params, ...opts });

/**
 * Release booking
 *
 * Releases all holds withing a booking
 *
 * @param {string} id
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const releaseBooking = (id, body, params, opts) => client.delete(`/bookings/${id}/holds`, { params, ...opts });

/**
 * Request booking
 *
 * Moves a booking to 'requested' status
 *
 * @param {string} id
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const requestBooking = (id, body, params, opts) =>
  client.post(`/bookings/${id}/request`, body, { params, ...opts });

/**
 * Get bookings
 *
 * Get a list of bookings
 *
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getBookings = (params, opts) => client.get(`/bookings`, { params, ...opts });

export default {
  amendBooking,
  bookingBuilder,
  cancelBooking,
  createBooking,
  getBooking,
  getBookingHolds,
  getBookings,
  holdBooking,
  releaseBooking,
  requestBooking,
  reviewBooking,
};
