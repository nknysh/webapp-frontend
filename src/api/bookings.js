import client from './index';

export const createBooking = (body, params) => client.post('/bookings', body, { params });

export const getBooking = (id, params) => client.get(`/bookings/${id}`, { params });

export const cancelBooking = (id, body, params) => client.post(`/bookings/${id}/cancel`, body, { params });

export const bookingBuilder = (body, params) => client.post('/booking-builder', body, { params });

export default { createBooking, bookingBuilder, getBooking, cancelBooking };
