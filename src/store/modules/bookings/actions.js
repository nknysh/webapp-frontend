import {
  addIndex,
  adjust,
  anyPass,
  append,
  concat,
  defaultTo,
  equals,
  filter,
  findLastIndex,
  has,
  isEmpty,
  keys,
  lensPath,
  lensProp,
  map,
  mapObjIndexed,
  mergeDeepLeft,
  mergeDeepRight,
  omit,
  over,
  path,
  pick,
  pickBy,
  pipe,
  prop,
  propEq,
  propOr,
  propSatisfies,
  reduce,
  reject,
  remove,
  set,
  update,
  view,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import client from 'api/bookings';
import { ProductTypes, BookingStatusTypes } from 'config/enums';
import { formatDate } from 'utils';

import { successAction, errorFromResponse } from 'store/common';
import { getSearchDates } from 'store/modules/search/selectors';
import { getUserCountryContext } from 'store/modules/auth/selectors';

import { getBooking, getBookingForBuilder } from './selectors';
import { addFinalDayToBooking } from './utils';

export const BOOKING_CHECKS = 'BOOKING_CHECKS';
export const BOOKING_REMOVE = 'BOOKING_REMOVE';
export const BOOKING_ROOM_ADD = 'BOOKING_ROOM_ADD';
export const BOOKING_ROOM_UPDATE = 'BOOKING_ROOM_UPDATE';
export const BOOKING_ROOM_REMOVE = 'BOOKING_ROOM_REMOVE';
export const BOOKING_SUBMIT = 'BOOKING_SUBMIT';
export const BOOKING_UPDATE = 'BOOKING_UPDATE';
export const BOOKINGS_SET = 'BOOKINGS_SET';
export const BOOKING_RESET = 'BOOKING_RESET';
export const BOOKING_FETCH = 'BOOKING_FETCH';

const ignoreCall = anyPass([has('marginApplied'), has('taMarginType'), has('taMarginAmount')]);

const getHotelName = path(['breakdown', 'hotel', 'name']);

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

export const updateRoomAction = payload => ({
  type: BOOKING_ROOM_UPDATE,
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

export const bookingsSetAction = payload => ({
  type: BOOKINGS_SET,
  payload,
});

export const fetchBookingAction = payload => ({
  type: BOOKING_FETCH,
  payload,
});

const productsLens = type => lensPath(['breakdown', 'requestedBuild', type]);

const viewProducts = (type, data) => view(productsLens(type), data);
const overProducts = (type, handler, data) => over(productsLens(type), handler, data);
const setProducts = (type, handler, data) => set(productsLens(type), handler, data);

export const addRoom = (id, uuid) => (dispatch, getState) => {
  dispatch(addRoomAction({ id, uuid }));

  const dates = map(formatDate, getSearchDates(getState()));

  const state = getState();
  const booking = getBooking(state, id);

  const next = overProducts(ProductTypes.ACCOMMODATION, append({ uuid, ...dates }), booking);

  dispatch(updateBooking(id, pick(['breakdown'], next)));
};

export const updateRoom = (id, uuid, payload) => (dispatch, getState) => {
  dispatch(updateRoomAction({ id, uuid, payload }));

  const state = getState();
  const booking = getBooking(state, id);
  const accommodations = viewProducts(ProductTypes.ACCOMMODATION, booking);

  const whereUuid = propEq('uuid', uuid);

  const rooms = pipe(
    filter(whereUuid),
    map(mergeDeepLeft(payload))
  )(accommodations);

  // Replace the rooms with new data
  const next = overProducts(
    ProductTypes.ACCOMMODATION,
    pipe(
      reject(whereUuid),
      concat(rooms)
    ),
    booking
  );

  dispatch(updateBooking(id, pick(['breakdown'], next)));
};

export const updateIndividualRoom = (id, uuid, index, payload) => (dispatch, getState) => {
  dispatch(updateRoomAction({ id, uuid, index, payload }));

  const state = getState();
  const booking = getBooking(state, id);
  const accommodations = viewProducts(ProductTypes.ACCOMMODATION, booking);

  const whereUuid = propEq('uuid', uuid);

  // preserve original indexes
  const originalIndexes = addIndex(reduce)(
    (accum, room, i) => (whereUuid(room) ? append(i, accum) : accum),
    [],
    accommodations
  );

  const rooms = pipe(
    filter(whereUuid),
    defaultTo([]),
    adjust(index, mergeDeepLeft(payload))
  )(accommodations);

  // Replace the rooms with new data
  const next = overProducts(ProductTypes.ACCOMMODATION, update(originalIndexes[index], rooms[index]), booking);

  dispatch(updateBooking(id, pick(['breakdown'], next)));
};

export const removeRoom = (id, uuid, all = false) => (dispatch, getState) => {
  dispatch(removeRoomAction({ id, uuid }));

  const state = getState();
  const booking = getBooking(state, id);

  const accommodations = viewProducts(ProductTypes.ACCOMMODATION, booking);
  const lastIndex = findLastIndex(propEq('uuid', uuid), accommodations);
  const next = overProducts(
    ProductTypes.ACCOMMODATION,
    all ? reject(propEq('uuid', uuid)) : remove(lastIndex, 1),
    booking
  );

  const nextProducts = viewProducts(ProductTypes.ACCOMMODATION, next);

  dispatch(updateBooking(id, pick(['breakdown'], next)));

  isEmpty(nextProducts) && dispatch({ type: BOOKING_RESET, payload: { id } });
};

export const replaceProducts = (id, type, payload) => (dispatch, getState) => {
  const state = getState();
  const booking = getBooking(state, id);

  const next = setProducts(type, payload, booking);

  dispatch(updateBooking(id, pick(['breakdown'], next)));
};

export const updateBooking = (id, payload, forceCall = false) => async (dispatch, getState) => {
  dispatch(updateBookingAction(payload));

  if (!payload) return dispatch(successAction(BOOKING_UPDATE, {}));

  const state = getState();

  const prevBooking = getBooking(state, id);

  // If there is no hotel info then we assume the booking ID is the hotel ID
  const hotelUuid = propOr(id, 'hotelUuid', prevBooking);

  let nextBooking = {
    ...payload,
    hotelUuid,
    hotelName: getHotelName(prevBooking),
  };

  const nextState = over(
    lensPath(['bookings', 'data', id]),
    pipe(
      defaultTo({}),
      mergeDeepLeft(nextBooking)
    ),
    state
  );

  const bookingBuilderPayload = getBookingForBuilder(nextState, id);

  const hasAccommodation = !propSatisfies(isNilOrEmpty, ProductTypes.ACCOMMODATION, bookingBuilderPayload);
  const shouldCall = forceCall || (!ignoreCall(payload) && hasAccommodation);

  const actingCountryCode = getUserCountryContext(state);
  let breakdown = {};

  try {
    const response =
      shouldCall &&
      (await client.bookingBuilder({ data: { attributes: { ...bookingBuilderPayload } } }, { actingCountryCode }));

    if (!hasAccommodation) {
      breakdown = set(lensPath(['potentialBooking', ProductTypes.ACCOMMODATION]), [], breakdown);
    }

    if (response) {
      const {
        data: { data },
      } = response;

      breakdown = data;
      nextBooking.hotelName = path(['hotel', 'name'], breakdown);
    }
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_UPDATE, e, 'Could not update booking. Please try again later.'));
    return;
  }

  dispatch(successAction(BOOKING_UPDATE, { [id]: mergeDeepRight(nextBooking, { breakdown }) }));
};

export const completeBooking = (id, payload) => async (dispatch, getState) => {
  dispatch(updateBooking(id, payload));

  const state = getState();
  const booking = getBooking(state, id);
  const { breakdown } = booking;

  const omitProps = [
    'canBeBooked',
    'mustStop',
    'bookingHash',
    'marginApplied',
    'payment',
    'availableToHold',
    'agreeToTerms',
    'hotelUuid',
    'hotelName',
    'breakdown',
  ];

  const bookingBuild = getBookingForBuilder(state, id);
  const bookingHash = prop('bookingHash', breakdown);
  const bookingInformation = pipe(
    omit(omitProps),
    over(
      lensProp('specialRequests'),
      pipe(
        pickBy(equals(true)),
        keys
      )
    )
  )(booking);

  const status = BookingStatusTypes.REQUESTED;

  const finalPayload = mergeDeepRight(
    {
      status,
      placeHolds: prop('availableToHold', breakdown),
      bookingBuild,
      bookingHash,
      bookingInformation,
    },
    omit(omitProps, payload)
  );

  dispatch(submitBookingAction(finalPayload));

  try {
    const {
      data: { data },
    } = await client.createBooking({ data: { attributes: finalPayload } });
    dispatch(successAction(BOOKING_SUBMIT, { id, data }));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_SUBMIT, e, 'There was a problem creating your booking.'));
  }
};

export const setBookings = data => dispatch => {
  dispatch(bookingsSetAction(bookings));

  const bookings = mapObjIndexed(addFinalDayToBooking, data);

  dispatch(successAction(BOOKINGS_SET, bookings));
};

export const fetchBooking = id => async dispatch => {
  dispatch(fetchBookingAction(id));

  try {
    const {
      data: { data },
    } = await client.getBooking(id);

    // Backend sees days as day+night so we need to add the last day to each accommodation product
    const booking = addFinalDayToBooking(data);

    dispatch(successAction(BOOKING_FETCH, { [id]: booking }));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_SUBMIT, e, 'There was a problem fetching the booking.'));
  }
};
