import {
  __,
  always,
  append,
  both,
  cond,
  curry,
  equals,
  findLastIndex,
  inc,
  lensPath,
  lensProp,
  map,
  mapObjIndexed,
  mergeDeepRight,
  objOf,
  omit,
  over,
  path,
  pick,
  pipe,
  prop,
  propSatisfies,
  reduce,
  remove,
  set,
  T,
  uniq,
  view,
  when,
  without,
} from 'ramda';

import client from 'api/bookings';
import { formatDate, getDaysBetween, isEmptyOrNil, isArray } from 'utils';

import { successAction, errorFromResponse, errorAction } from 'store/common';
import { enqueueNotification } from 'store/modules/ui/actions';
import { getHotelRoom, getHotelProduct } from 'store/modules/hotels/selectors';
import { setHotels } from 'store/modules/hotels/actions';
import { getSuccessActionName } from 'store/utils';

import { getBookingByHotelId, getBookingRoomDatesById, getBookingForBuilder } from './selectors';

const accommodationProductsLens = lensProp('accommodationProducts');
const datesLens = lensProp('dates');
const ratesLens = lensPath(['dates', 'rates']);

export const BOOKING_UPDATE = 'BOOKING_UPDATE';
export const BOOKING_CHECKS = 'BOOKING_CHECKS';
export const BOOKING_SUBMIT = 'BOOKING_SUBMIT';
export const BOOKING_ROOM_ADD = 'BOOKING_ROOM_ADD';
export const BOOKING_ROOM_REMOVE = 'BOOKING_ROOM_REMOVE';
export const BOOKING_REMOVE = 'BOOKING_REMOVE';

const getGuestsChecks = mapObjIndexed(objOf('checks'));

const removeBy = curry((ids, data) => {
  const remover = () => {
    const removeIndex = findLastIndex(equals(ids), data);
    return remove(removeIndex, inc(removeIndex), data);
  };

  if (isArray(data)) {
    return isArray(ids) ? without(ids, data) : remover(ids);
  }

  return undefined;
});

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

export const addRoomAction = payload => ({
  type: BOOKING_ROOM_ADD,
  payload,
});

export const removeRoomAction = payload => ({
  type: BOOKING_ROOM_REMOVE,
  payload,
});

export const removeBooking = payload => ({
  type: BOOKING_REMOVE,
  payload,
});

export const amendProduct = (id, next, type, unique = true) => (dispatch, getState) => {
  const handler = cond([[equals('remove'), always(removeBy)], [equals('add'), always(append)], [T, always(always)]]);

  const state = getState();

  const shouldBeUnique = () => unique;

  const doAmend = (booking, productId) => {
    const product = getHotelProduct(state, productId);
    const productType = prop('type', product);
    const lensType = lensPath(['products', productType]);

    if (!product) {
      return dispatch(errorAction(BOOKING_UPDATE, { message: `Could not amend product ${productId} to booking` }));
    }

    return pipe(
      over(lensType, handler(type)(productId)),
      over(lensType, when(both(isArray, shouldBeUnique), uniq)),
      view(lensType),
      objOf(productType),
      objOf('products')
    )(booking);
  };

  const booking = isArray(next) ? reduce(doAmend, {}, next) : doAmend({}, next);

  dispatch(updateBooking(id, booking));
};

export const addProduct = (id, productId, unique = true) => dispatch => {
  dispatch(amendProduct(id, productId, 'add', unique));
};

export const removeProduct = (id, productId, unique = true) => dispatch => {
  dispatch(amendProduct(id, productId, 'remove', unique));
};

export const addRoom = (id, roomId) => (dispatch, getState) => {
  dispatch(addRoomAction({ id, uuid: roomId }));

  const state = getState();
  const hotelbooking = getBookingByHotelId(state, id);
  const guests = path(['Accommodation', roomId, 'guests'], hotelbooking);

  dispatch(updateBooking(id, { Accommodation: { [roomId]: { guests: append({}, guests) } } }));
};

export const removeRoom = (id, roomId, all = false) => (dispatch, getState) => {
  dispatch(removeRoomAction({ id, uuid: roomId }));

  const state = getState();
  const hotelbooking = getBookingByHotelId(state, id);
  const prevAccommodation = prop('Accommodation', hotelbooking);
  const guests = path([roomId, 'guests'], prevAccommodation);

  guests.length = guests.length - 1 < 0 ? 0 : guests.length - 1;

  const payload = equals(0, guests.length)
    ? omit([roomId], prop('Accommodation', hotelbooking))
    : mergeDeepRight(prevAccommodation, { [roomId]: { guests: all ? [] : [...guests] } });

  dispatch({ type: getSuccessActionName(BOOKING_ROOM_REMOVE), payload: { id, ...payload } });
  dispatch(updateBooking(id, {}));
};

export const updateBooking = (id, payload) => async (dispatch, getState) => {
  getState();
  dispatch(updateBookingAction(payload));
  const state = getState();

  const nextBooking = { [id]: payload };
  const nextState = mergeDeepRight(state, { booking: { data: nextBooking } });

  const bookingBuilderPayload = getBookingForBuilder(nextState, id);

  let result = {};

  try {
    const hasAccommodation = !propSatisfies(isEmptyOrNil, 'Accommodation', bookingBuilderPayload);

    const response =
      hasAccommodation && (await client.bookingBuilder({ data: { attributes: { ...bookingBuilderPayload } } }));

    if (!hasAccommodation) {
      result = set(lensPath(['potentialBooking', 'Accommodation']), [], result);
    }

    if (response) {
      const {
        data: {
          data: { entities, result: responseResult },
        },
      } = response;

      result = responseResult;

      dispatch(setHotels({ entities }));
    }
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_UPDATE, e));
    dispatch(
      enqueueNotification({
        message: 'Could not update booking. Please try again later.',
        options: { variant: 'error' },
      })
    );

    return;
  }

  dispatch(successAction(BOOKING_UPDATE, { [id]: { ...payload, ...result } }));
};

export const updateBookingExtras = (id, prev, next) => dispatch => {
  dispatch(amendProduct(id, next));
};

export const checkBooking = (id, payload) => async (dispatch, getState) => {
  dispatch(checkBookingAction(id));

  const state = getState();
  const booking = getBookingByHotelId(state, id);

  const nextBooking = mergeDeepRight(booking, payload);

  const body = pipe(
    prop('Accommodation'),
    mapObjIndexed(prop('guests'))
  )(nextBooking);

  try {
    const {
      data: { data },
    } = await client.occupancyCheck({ data: body });

    const guestChecks = getGuestsChecks(data);

    dispatch(successAction(BOOKING_CHECKS, { [id]: { Accommodation: { ...guestChecks } } }));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_CHECKS, e));
    dispatch(
      enqueueNotification({
        message: 'Could not check booking. Please try again later.',
        options: { variant: 'error' },
      })
    );
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
  }
};
