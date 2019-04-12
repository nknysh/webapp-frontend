import client from './index';

export const createBooking = (body, params) => client.post('/bookings', body, { params });

export default { createBooking };
