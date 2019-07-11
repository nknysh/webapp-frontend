import client from './index';

export const amendBooking = (id, body, params, opts) => client.patch(`/bookings/${id}`, body, { params, ...opts });

export const reviewBooking = (id, body, params, opts) =>
  client.post(`/bookings/${id}/review`, body, { params, ...opts });

export const bookingBuilder = (body, params, opts) => client.post('/booking-builder', body, { params, ...opts });

export const cancelBooking = (id, body, params, opts) =>
  client.post(`/bookings/${id}/cancel`, body, { params, ...opts });

export const createBooking = (body, params, opts) => client.post('/bookings', body, { params, ...opts });

export const getBooking = (id, params, opts) => client.get(`/bookings/${id}`, { params, ...opts });

export const getBookingHolds = (id, params, opts) => client.get(`/bookings/${id}/holds`, { params, ...opts });

export const holdBooking = (id, body, params, opts) => client.post(`/bookings/${id}/holds`, body, { params, ...opts });

export const releaseBooking = (id, body, params, opts) => client.delete(`/bookings/${id}/holds`, { params, ...opts });

export const requestBooking = (id, body, params, opts) =>
  client.post(`/bookings/${id}/request`, body, { params, ...opts });

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
