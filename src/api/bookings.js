import client from './index';

export const createBooking = (body, params) => client.post('/bookings', body, { params });

export const bookingBuilder = (body, params) => client.post('/booking-builder', body, { params });

export default { createBooking, bookingBuilder };
