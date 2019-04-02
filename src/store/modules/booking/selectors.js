import { __, path, prop, pipe, curry, pathOr, propOr, add, multiply, toPairs, reduce, when, always } from 'ramda';
import { createSelector } from 'reselect';

import { isEmptyOrNil, formatPrice } from 'utils';

import { getHotel } from 'store/modules/hotels/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

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
      reduce(totalFromBooking, 0),
      formatPrice
    );

    return getRoomsTotal(booking);
  }
);

export const getBookingRoomById = curry((state, hotelId, roomId) =>
  pipe(
    getBookingByHotelId(__, hotelId),
    path(['rooms', roomId])
  )(state)
);

export const getBookingRoomDatesById = curry((state, hotelId, roomId) =>
  createSelector(
    getSearchDates,
    getBookingByHotelId,
    (searchDates, booking) => {
      return pipe(
        path(['rooms', roomId, 'dates']),
        when(isEmptyOrNil, always(searchDates))
      )(booking);
    }
  )(state, hotelId)
);
