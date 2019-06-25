import client from './index';

export const amendBooking = (id, body, params) => client.patch(`/bookings/${id}`, body, { params });

export const reviewBooking = (id, body, params) => client.post(`/bookings/${id}/review`, body, { params });

export const bookingBuilder = (body, params) => client.post('/booking-builder', body, { params });

export const cancelBooking = (id, body, params) => client.post(`/bookings/${id}/cancel`, body, { params });

export const createBooking = (body, params) => client.post('/bookings', body, { params });

export const getBooking = (id, params) => client.get(`/bookings/${id}`, { params });

export const getBookingHolds = (id, params) => client.get(`/bookings/${id}/holds`, { params });

export const holdBooking = (id, body, params) => client.post(`/bookings/${id}/holds`, body, { params });

export const releaseBooking = (id, body, params) => client.delete(`/bookings/${id}/holds`, { params });

export const requestBooking = (id, body, params) => client.post(`/bookings/${id}/request`, body, { params });

export const getBookings = params => client.get(`/bookings`, { params });

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
