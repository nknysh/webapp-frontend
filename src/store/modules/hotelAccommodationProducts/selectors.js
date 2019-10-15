import { prop, pipe, path } from 'ramda';

export const getCurrentHotelAccommodationProducts = pipe(
  prop('hotelAccommodationProducts'),
  path(['data'])
);

export const getCurrentHotelAccommodationProductsError = pipe(
  prop('hotelAccommodationProducts'),
  path(['error'])
);
