import client from './index';

/**
 * Get proposals
 *
 * Get a list of proposals
 *
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getProposals = (params, opts) => client.get('/proposals', { params, ...opts });

/**
 * Create proposal
 *
 * Creates a proposal object
 *
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const createProposal = (body, params, opts) => client.post('/proposals', body, { params, ...opts });

/**
 * Get proposal
 *
 * @param {string} id
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getProposal = (id, params, opts) => client.get(`/proposals/${id}`, { params, opts });

/**
 * Update proposal
 *
 * @param {string} id
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const updateProposal = (id, body, params, opts) => client.patch(`/proposals/${id}`, body, { params, ...opts });
export const completeProposal = (id, body, params, opts) =>
  client.post(`/proposals/${id}/complete`, body, { params, ...opts });

export const generateProposalPdf = (id, body, params, opts) =>
  client.post(`/proposals/${id}/pdf`, body, { params, ...opts });

/**
 * Remove booking
 *
 * @param {string} id
 * @param {string} bookingId
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const removeBooking = (id, bookingId, params, opts) =>
  client.delete(`/proposals/${id}/bookings/${bookingId}`, { params, ...opts });

export default { getProposals, getProposal, createProposal, updateProposal, removeBooking, completeProposal, generateProposalPdf };
