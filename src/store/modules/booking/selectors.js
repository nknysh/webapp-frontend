import { prop, pipe, curry } from 'ramda';

export const getBooking = prop('booking');

export const getBookingStatus = pipe(
  getBooking,
  prop('status')
);

export const getBookingData = pipe(
  getBooking,
  prop('data')
);

export const getBookingByHotelId = curry((state, id) =>
  pipe(
    getBookingData,
    prop(id)
  )(state)
);
