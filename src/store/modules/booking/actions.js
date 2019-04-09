import { __, pick, lensProp, lensPath, prop, set, view, map, mapObjIndexed, pipe, mergeDeepRight, omit } from 'ramda';
import { eachDay, subDays } from 'date-fns';

import client from 'api/bookings';
import { formatDate } from 'utils';

import { successAction, errorAction } from 'store/common';
import { enqueueNotification } from 'store/modules/ui/actions';
import { getHotelRoom } from 'store/modules/hotels/selectors';

import { getBookingData, getBookingByHotelId, getBookingRoomDatesById } from './selectors';

const accommodationProductsLens = lensProp('accommodationProducts');
const datesLens = lensProp('dates');
const ratesLens = lensPath(['dates', 'rates']);

export const BOOKING_UPDATE = 'BOOKING_UPDATE';
export const BOOKING_SUBMIT = 'BOOKING_SUBMIT';
export const BOOKING_REMOVE = 'BOOKING_REMOVE';

export const updateBookingAction = payload => ({
  type: BOOKING_UPDATE,
  payload,
});

export const submitBookingAction = payload => ({
  type: BOOKING_SUBMIT,
  payload,
});

export const removeBooking = payload => ({
  type: BOOKING_REMOVE,
  payload,
});

export const updateBooking = (id, payload) => (dispatch, getState) => {
  const state = getState();

  dispatch(updateBookingAction(payload));
  dispatch(successAction(BOOKING_UPDATE, mergeDeepRight(getBookingData(state), { [id]: payload })));
};

export const completeBooking = (id, payload) => (dispatch, getState) => {
  dispatch(updateBooking(id, payload));

  const state = getState();
  const booking = getBookingByHotelId(state, id);

  const finaliseAccommodationProducts = (product, productId) => {
    const hotelRoom = getHotelRoom(state, id, productId);
    const { to, from } = getBookingRoomDatesById(state, id, productId);

    const rates = prop('rates', hotelRoom);

    const days = eachDay(from, subDays(to, 1));
    const ratesForDays = pipe(
      map(formatDate),
      pick(__, rates),
      mapObjIndexed(omit(['addons']))
    )(days);

    return pipe(
      set(datesLens, { to, from }),
      set(ratesLens, ratesForDays)
    )(product);
  };

  const finalBooking = pipe(
    set(
      accommodationProductsLens,
      mapObjIndexed(finaliseAccommodationProducts, view(accommodationProductsLens, booking))
    )
  )(booking);

  dispatch(submitBookingAction(finalBooking));

  client
    .createBooking({ data: { attributes: { id, ...finalBooking } } })
    .then(({ data: { data } }) => {
      dispatch(updateBooking(id, { reservationId: prop('reservationId', data) }));
      dispatch(successAction(BOOKING_SUBMIT, data));
    })
    .catch(error => {
      dispatch(
        enqueueNotification({ message: 'There was a problem creating your booking.', options: { variant: 'error' } })
      );
      dispatch(errorAction(BOOKING_SUBMIT, error));
    });
};
