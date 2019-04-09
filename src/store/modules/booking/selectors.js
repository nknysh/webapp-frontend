import {
  __,
  always,
  append,
  curry,
  keys,
  map,
  multiply,
  path,
  pickBy,
  pipe,
  prop,
  propOr,
  reduce,
  sum,
  uniq,
  values,
  when,
} from 'ramda';
import { createSelector } from 'reselect';
import { isBefore, isAfter, isEqual } from 'date-fns';

import { isEmptyOrNil, formatPrice, getNumberOfDays } from 'utils';

import { getHotelRoom } from 'store/modules/hotels/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

const getRate = (accum, rate) => append(Number(propOr(0, 'rate', rate)), accum);

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

export const getBookingRoomById = curry((state, hotelId, roomId) =>
  pipe(
    getBookingByHotelId(__, hotelId),
    path(['accommodationProducts', roomId])
  )(state)
);

export const getBookingRoomDatesById = curry((state, hotelId, roomId) =>
  createSelector(
    getSearchDates,
    getBookingByHotelId,
    (searchDates, booking) => {
      return pipe(
        path(['accommodationProducts', roomId, 'dates']),
        when(isEmptyOrNil, always(searchDates))
      )(booking);
    }
  )(state, hotelId)
);

export const getBookingRoomTotal = curry((state, hotelId, roomId) => {
  const hotelRoom = getHotelRoom(state, hotelId, roomId);
  const roomBooking = getBookingRoomById(state, hotelId, roomId);

  const { to, from } = getBookingRoomDatesById(state, hotelId, roomId);
  const quantity = propOr(0, 'quantity', roomBooking);

  const days = getNumberOfDays({ from, to });

  const rateRange = pickBy((rate, date) => {
    const theDate = new Date(date);
    const equalsFrom = isEqual(from, theDate);
    const equalsTo = isEqual(to, theDate);

    const after = isAfter(from, theDate);
    const before = isBefore(to, theDate);

    return equalsFrom || after || before || equalsTo;
  });

  return pipe(
    prop('rates'),
    rateRange,
    values,
    reduce(getRate, []),
    uniq,
    sum,
    multiply(days),
    multiply(quantity),
    formatPrice
  )(hotelRoom);
});

export const getBookingTotalByHotelId = curry((state, hotelId) =>
  pipe(
    getBookingByHotelId,
    prop('accommodationProducts'),
    keys,
    map(getBookingRoomTotal(state, hotelId)),
    sum,
    formatPrice
  )(state, hotelId)
);
