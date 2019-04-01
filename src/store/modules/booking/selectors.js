import { prop, pipe, curry, pathOr, propOr, add, multiply, toPairs, reduce } from 'ramda';
import { createSelector } from 'reselect';

import { getHotel } from 'store/modules/hotels/selectors';

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

export const getBookingTotalByHotelId = createSelector(
  getBookingByHotelId,
  getHotel,
  (booking, hotel) => {
    const totalFromBooking = (accum, [key, value]) => {
      const roomRate = pathOr(0, ['rooms', key, 'bestRate', 'rate'], hotel);
      return add(multiply(roomRate, propOr(0, 'quantity', value)), accum);
    };

    const getRoomsTotal = pipe(
      prop('rooms'),
      toPairs,
      reduce(totalFromBooking, 0)
    );

    return getRoomsTotal(booking);
  }
);
