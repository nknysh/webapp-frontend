import client from './index';

export const getProposals = params => client.get('/proposals', { params });

export const createProposal = (payload, params) => client.post('/proposals', payload, params);

export const getProposal = (id, params) => client.get(`/proposals/${id}`, { params });

export const updateProposal = (id, payload, params) => client.patch(`/proposals/${id}`, payload, params);

export const removeBooking = (id, bookingId, params) => client.delete(`/proposals/${id}/bookings/${bookingId}`, params);

export default { getProposals, getProposal, createProposal, updateProposal, removeBooking };
