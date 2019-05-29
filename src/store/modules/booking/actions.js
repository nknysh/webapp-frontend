import {
  __,
  anyPass,
  append,
  complement,
  equals,
  has,
  lensPath,
  lensProp,
  map,
  mapObjIndexed,
  mergeDeepRight,
  omit,
  partialRight,
  path,
  pick,
  pipe,
  prop,
  propSatisfies,
  reduce,
  set,
  split,
  toPairs,
  view,
  pathOr,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import client from 'api/bookings';
import { ProductTypes } from 'config/enums';
import { formatDate, getDaysBetween } from 'utils';

import { successAction, errorFromResponse } from 'store/common';
import { enqueueNotification } from 'store/modules/ui/actions';
import { getHotelRoom, getHotelProduct } from 'store/modules/hotels/selectors';
import { setHotels } from 'store/modules/hotels/actions';
import { getUserCountryContext } from 'store/modules/auth/selectors';
import { getSuccessActionName } from 'store/utils';

import { getBookingByHotelId, getBookingRoomDatesById, getBookingForBuilder, getPotentialBooking } from './selectors';

export const BOOKING_CHECKS = 'BOOKING_CHECKS';
export const BOOKING_REMOVE = 'BOOKING_REMOVE';
export const BOOKING_ROOM_ADD = 'BOOKING_ROOM_ADD';
export const BOOKING_ROOM_REMOVE = 'BOOKING_ROOM_REMOVE';
export const BOOKING_SUBMIT = 'BOOKING_SUBMIT';
export const BOOKING_UPDATE = 'BOOKING_UPDATE';

const accommodationProductsLens = lensProp('accommodationProducts');
const datesLens = lensProp('dates');
const ratesLens = lensPath(['dates', 'rates']);

const triggerCall = anyPass([complement(has('margin'))]);

export const updateBookingAction = payload => ({
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

export const addRoom = (id, roomId) => (dispatch, getState) => {
  dispatch(addRoomAction({ id, uuid: roomId }));

  const state = getState();
  const hotelbooking = getBookingByHotelId(state, id);
  const guests = path(['products', ProductTypes.ACCOMMODATION, roomId, 'guests'], hotelbooking);

  dispatch(
    updateBooking(id, { products: { [ProductTypes.ACCOMMODATION]: { [roomId]: { guests: append({}, guests) } } } })
  );
};

export const removeRoom = (id, roomId, all = false) => (dispatch, getState) => {
  dispatch(removeRoomAction({ id, uuid: roomId }));

  const state = getState();
  const hotelbooking = getBookingByHotelId(state, id);
  const prevAccommodation = path(['products', ProductTypes.ACCOMMODATION], hotelbooking);
  const guests = pathOr([], [roomId, 'guests'], prevAccommodation);

  guests.length = guests.length - 1 < 0 ? 0 : guests.length - 1;

  const payload = equals(0, guests.length)
    ? omit([roomId], path(['products', ProductTypes.ACCOMMODATION], hotelbooking))
    : mergeDeepRight(prevAccommodation, { [roomId]: { guests: all ? [] : [...guests] } });

  dispatch({ type: getSuccessActionName(BOOKING_ROOM_REMOVE), payload: { id, ...payload } });
  dispatch(updateBooking(id, {}));
};

export const updateBooking = (id, payload) => async (dispatch, getState) => {
  dispatch(updateBookingAction(payload));

  if (!payload) return dispatch(successAction(BOOKING_UPDATE, {}));

  const state = getState();
  const actingCountryCode = getUserCountryContext(state);

  const nextBooking = { [id]: payload };
  const nextState = mergeDeepRight(state, { booking: { data: nextBooking } });

  const bookingBuilderPayload = getBookingForBuilder(nextState, id);
  const hasAccommodation = !propSatisfies(isNilOrEmpty, ProductTypes.ACCOMMODATION, bookingBuilderPayload);

  const shouldCall = triggerCall(payload) && hasAccommodation;

  let result = {};

  try {
    const response =
      shouldCall &&
      (await client.bookingBuilder({ data: { attributes: { ...bookingBuilderPayload } } }, { actingCountryCode }));

    if (!hasAccommodation) {
      result = set(lensPath(['potentialBooking', ProductTypes.ACCOMMODATION]), [], result);
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

export const updateBookingExtras = (id, rawUuids) => (dispatch, getState) => {
  const state = getState();

  const reduceToExtras = (accum, uuid, selected, direction) => {
    const product = getHotelProduct(state, uuid);

    if (!product) return accum;

    const initialPath = direction ? [prop('type', product), direction] : [prop('type', product)];

    const productLens = lensPath([...initialPath, uuid]);

    return set(productLens, selected, accum);
  };

  const getExtrasProducts = pipe(
    toPairs,
    reduce((accum, [uuidsData, selected]) => {
      const [uuidsString, direction] = split('|', uuidsData);

      return mergeDeepRight(
        accum,
        pipe(
          split(','),
          reduce(partialRight(reduceToExtras, [selected, direction]), {})
        )(uuidsString)
      );
    }, {})
  );

  dispatch(updateBooking(id, { products: getExtrasProducts(rawUuids) }));
};

export const completeBooking = (id, payload) => async (dispatch, getState) => {
  dispatch(updateBooking(id, payload));

  const state = getState();
  const booking = getPotentialBooking(state, id);

  dispatch(submitBookingAction(booking));

  try {
    const {
      data: { data },
    } = await client.createBooking({ data: { attributes: { id, ...booking } } });

    dispatch(updateBooking(id, { reservationId: prop('uuid', data) }));
    dispatch(successAction(BOOKING_SUBMIT, data));
  } catch (e) {
    dispatch(
      enqueueNotification({ message: 'There was a problem creating your booking.', options: { variant: 'error' } })
    );
    dispatch(errorFromResponse(BOOKING_SUBMIT, e));
  }
};
