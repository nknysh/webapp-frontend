import { prop, pipe } from 'ramda';

export const getHotel = prop('hotel');

export const getHotelStatus = pipe(
  getHotel,
  prop('status')
);

export const getHotelId = pipe(
  getHotel,
  prop('id')
);
