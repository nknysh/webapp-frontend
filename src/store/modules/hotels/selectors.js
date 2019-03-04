import { __, prop, pipe, curry } from 'ramda';

export const getHotels = prop('hotels');

export const getHotelsData = pipe(
  getHotels,
  prop('data')
);

export const getHotel = curry((state, index) =>
  pipe(
    getHotelsData,
    prop(index)
  )(state)
);

export const getHotelTitle = curry((state, index) =>
  pipe(
    getHotel(__, index),
    prop('title')
  )(state)
);
