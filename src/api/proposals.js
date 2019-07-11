import client from './index';

export const getProposals = (params, opts) => client.get('/proposals', { params, ...opts });

export const createProposal = (body, params, opts) => client.post('/proposals', body, { params, ...opts });

export const getProposal = (id, params, opts) => client.get(`/proposals/${id}`, { params, opts });

export const updateProposal = (id, body, params, opts) => client.patch(`/proposals/${id}`, body, { params, ...opts });

export const removeBooking = (id, bookingId, params, opts) =>
  client.delete(`/proposals/${id}/bookings/${bookingId}`, { params, ...opts });

export default { getProposals, getProposal, createProposal, updateProposal, removeBooking };
