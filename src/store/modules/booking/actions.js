import { __, lensPath, lensProp, map, mapObjIndexed, mergeDeepRight, objOf, pick, pipe, prop, set, view } from 'ramda';

import client from 'api/bookings';
import { formatDate, getDaysBetween } from 'utils';

import { successAction, errorFromResponse } from 'store/common';
import { enqueueNotification } from 'store/modules/ui/actions';
import { getHotelRoom } from 'store/modules/hotels/selectors';

import { getBookingData, getBookingByHotelId, getBookingRoomDatesById } from './selectors';

const accommodationProductsLens = lensProp('accommodationProducts');
const datesLens = lensProp('dates');
const ratesLens = lensPath(['dates', 'rates']);

export const BOOKING_UPDATE = 'BOOKING_UPDATE';
export const BOOKING_CHECKS = 'BOOKING_CHECKS';
export const BOOKING_SUBMIT = 'BOOKING_SUBMIT';
export const BOOKING_ROOM_REMOVE = 'BOOKING_ROOM_REMOVE';
export const BOOKING_REMOVE = 'BOOKING_REMOVE';

const getQuantityChecks = mapObjIndexed(
  pipe(
    objOf('quantity'),
    objOf('checks')
  )
);

export const updateBookingAction = payload => ({
  type: BOOKING_UPDATE,
  payload,
});

export const checkBookingAction = payload => ({
  type: BOOKING_UPDATE,
  payload,
});

export const submitBookingAction = payload => ({
  type: BOOKING_SUBMIT,
  payload,
});

export const removeRoom = payload => ({
  type: BOOKING_ROOM_REMOVE,
  payload,
});

export const removeBooking = payload => ({
  type: BOOKING_REMOVE,
  payload,
});

export const updateBooking = (id, payload) => async (dispatch, getState) => {
  const state = getState();
  dispatch(updateBookingAction(payload));
  dispatch(successAction(BOOKING_UPDATE, mergeDeepRight(getBookingData(state), { [id]: payload })));
};

export const checkBooking = (id, payload) => async (dispatch, getState) => {
  dispatch(checkBookingAction(id));

  const state = getState();
  const booking = getBookingByHotelId(state, id);

  const nextBooking = mergeDeepRight(booking, payload);

  const body = pipe(
    prop('accommodationProducts'),
    mapObjIndexed(prop('quantity'))
  )(nextBooking);

  try {
    const {
      data: { data },
    } = await client.occupancyCheck({ data: body });

    const quantityChecks = getQuantityChecks(data);

    dispatch(successAction(BOOKING_CHECKS, { [id]: { accommodationProducts: { ...quantityChecks } } }));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_CHECKS, e));
    throw e;
  }
};

export const completeBooking = (id, payload) => async (dispatch, getState) => {
  dispatch(updateBooking(id, payload));

  const state = getState();
  const booking = getBookingByHotelId(state, id);

  const finaliseAccommodationProducts = (product, productId) => {
    const hotelRoom = getHotelRoom(state, id, productId);
    const { to, from } = getBookingRoomDatesById(state, id, productId);

    const rates = prop('rates', hotelRoom);

    const days = getDaysBetween(from, to);
    const ratesForDays = pipe(
      map(formatDate),
      pick(__, rates)
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

  try {
    const {
      data: { data },
    } = await client.createBooking({ data: { attributes: { id, ...finalBooking } } });

    dispatch(updateBooking(id, { reservationId: prop('uuid', data) }));
    dispatch(successAction(BOOKING_SUBMIT, data));
  } catch (e) {
    dispatch(
      enqueueNotification({ message: 'There was a problem creating your booking.', options: { variant: 'error' } })
    );
    dispatch(errorFromResponse(BOOKING_SUBMIT, e));
    throw e;
  }
};
