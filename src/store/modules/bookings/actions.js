import {
  __,
  complement,
  toUpper,
  addIndex,
  adjust,
  anyPass,
  append,
  concat,
  defaultTo,
  equals,
  filter,
  findLastIndex,
  forEach,
  has,
  isEmpty,
  keys,
  lensPath,
  lensProp,
  map,
  mapObjIndexed,
  hasPath,
  mergeDeepLeft,
  mergeDeepRight,
  omit,
  over,
  partial,
  path,
  pick,
  pickBy,
  pipe,
  uniq,
  prop,
  propEq,
  propOr,
  propSatisfies,
  reduce,
  reject,
  remove,
  objOf,
  set,
  update,
  values,
  view,
  when,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import client from 'api/bookings';
import { ProductTypes, BookingStatusTypes } from 'config/enums';
import { formatDate, mapWithIndex } from 'utils';

import { successAction, errorFromResponse, genericAction } from 'store/common';
import { getSearchDates, getSearchLodgings, getSearchMealPlan } from 'store/modules/search/selectors';
import { getUserCountryContext } from 'store/modules/auth/selectors';

import { getBooking, getBookingForBuilder, getBookingMealPlanForRoomByType } from './selectors';
import { addFinalDayToBooking } from './utils';

export const BOOKING_CANCEL = 'BOOKING_CANCEL';
export const BOOKING_CHECKS = 'BOOKING_CHECKS';
export const BOOKING_FETCH = 'BOOKING_FETCH';
export const BOOKING_HOLD = 'BOOKING_HOLD';
export const BOOKING_HOLDS_FETCH = 'BOOKING_HOLDS_FETCH';
export const BOOKING_RELEASE = 'BOOKING_RELEASE';
export const BOOKING_REMOVE = 'BOOKING_REMOVE';
export const BOOKING_REQUEST = 'BOOKING_REQUEST';
export const BOOKING_REQUEST_WITH_HOLD = 'BOOKING_WITH_HOLD';
export const BOOKING_RESET = 'BOOKING_RESET';
export const BOOKING_ROOM_ADD = 'BOOKING_ROOM_ADD';
export const BOOKING_ROOM_REMOVE = 'BOOKING_ROOM_REMOVE';
export const BOOKING_ROOM_UPDATE = 'BOOKING_ROOM_UPDATE';
export const BOOKING_SUBMIT = 'BOOKING_SUBMIT';
export const BOOKING_UPDATE = 'BOOKING_UPDATE';
export const BOOKINGS_SET = 'BOOKINGS_SET';
export const BOOKING_POPULATE = 'BOOKING_POPULATE';

const ignoreCall = anyPass([has('marginApplied'), has('taMarginType'), has('taMarginAmount')]);

const getHotelName = path(['breakdown', 'hotel', 'name']);

const updateBookingAction = partial(genericAction, [BOOKING_UPDATE]);

const updateRoomAction = partial(genericAction, [BOOKING_ROOM_UPDATE]);

const productsLens = type => lensPath(['breakdown', 'requestedBuild', type]);

const viewProducts = (type, data) => view(productsLens(type), data);
const overProducts = (type, handler, data) => over(productsLens(type), handler, data);
const setProducts = (type, handler, data) => set(productsLens(type), handler, data);

const reduceMealPlans = (accum, mealPlan) =>
  concat(accum, map(path(['product', 'uuid']), propOr([], 'breakdown', mealPlan)));

export const removeBooking = partial(genericAction, [BOOKING_REMOVE]);

export const fetchBookingHolds = id => async dispatch => {
  dispatch(genericAction(BOOKING_HOLDS_FETCH, { id }));

  try {
    const {
      data: { data },
    } = await client.getBookingHolds(id);

    dispatch(successAction(BOOKING_HOLDS_FETCH, { [id]: data }));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_HOLDS_FETCH, e, 'Could not fetch holds for this booking.'));
  }
};

export const addRoom = (id, uuid) => async (dispatch, getState) => {
  dispatch(genericAction(BOOKING_ROOM_ADD, { id, uuid }));
  const dates = map(formatDate, getSearchDates(getState()));
  const lodgings = pipe(
    getSearchLodgings,
    map(
      pipe(
        over(lensProp('numberOfAdults'), Number),
        when(has('agesOfAllChildren'), over(lensProp('agesOfAllChildren'), map(Number))),
        objOf('guestAges')
      )
    )
  )(getState());

  const booking = getBooking(getState(), id);

  const next = overProducts(
    ProductTypes.ACCOMMODATION,
    pipe(
      defaultTo([]),
      concat(__, map(mergeDeepLeft({ ...dates, uuid }), lodgings))
    ),
    booking
  );

  // Update booking first to trigger BB call, which will pull down meal plans
  await dispatch(updateBooking(id, pick(['breakdown'], next)));

  const mealPlan = pipe(
    getSearchMealPlan,
    when(complement(isNilOrEmpty), toUpper)
  )(getState());

  if (!isNilOrEmpty(mealPlan)) {
    const roomMealPlans = getBookingMealPlanForRoomByType(getState(), id, uuid, mealPlan);

    const selectedMealPlans = map(
      pipe(
        reduce(reduceMealPlans, []),
        uniq,
        map(objOf('uuid'))
      ),
      roomMealPlans
    );

    const nextBooking = getBooking(getState(), id);
    const nextWithMealPlans = overProducts(
      ProductTypes.ACCOMMODATION,
      mapWithIndex((accom, i) =>
        when(
          complement(hasPath(['subProducts', ProductTypes.MEAL_PLAN])),
          mergeDeepLeft({ subProducts: { [ProductTypes.MEAL_PLAN]: propOr([], i, selectedMealPlans) } })
        )(accom)
      ),
      nextBooking
    );

    await dispatch(updateBooking(id, pick(['breakdown'], nextWithMealPlans)));
  }
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
  dispatch(genericAction(BOOKING_ROOM_REMOVE, { id, uuid }));

  const state = getState();
  const booking = getBooking(state, id);

  const accommodations = defaultTo([], viewProducts(ProductTypes.ACCOMMODATION, booking));
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
    touched: true,
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

export const completeBooking = (id, payload, status = BookingStatusTypes.REQUESTED, placeHolds = false) => async (
  dispatch,
  getState
) => {
  await dispatch(updateBooking(id, payload));

  const booking = getBooking(getState(), id);
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
    'touched',
  ];

  const bookingBuild = getBookingForBuilder(getState(), id);
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

  const finalPayload = {
    status,
    placeHolds,
    bookingBuild,
    bookingHash,
    bookingInformation,
  };

  dispatch(genericAction(BOOKING_SUBMIT, finalPayload));

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
  dispatch(genericAction(BOOKINGS_SET, bookings));

  const bookings = mapObjIndexed(addFinalDayToBooking, data);

  forEach(({ uuid }) => {
    dispatch(fetchBookingHolds(uuid));
  }, values(bookings));

  dispatch(successAction(BOOKINGS_SET, bookings));
};

export const fetchBooking = id => async dispatch => {
  dispatch(genericAction(BOOKING_FETCH, id));

  try {
    const {
      data: { data },
    } = await client.getBooking(id);

    // Backend sees days as day+night so we need to add the last day to each accommodation product
    const booking = addFinalDayToBooking(data);

    dispatch(fetchBookingHolds(id));
    dispatch(successAction(BOOKING_FETCH, { [id]: booking }));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_SUBMIT, e, 'There was a problem fetching the booking.'));
  }
};

export const cancelBooking = id => async dispatch => {
  dispatch(genericAction(BOOKING_CANCEL, { id }));

  try {
    const {
      data: { data },
    } = await client.cancelBooking(id);

    dispatch(successAction(BOOKING_CANCEL, { [id]: data }));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_CANCEL, e, 'There was a problem cancelling the booking.'));
  }
};

export const bookingToHotelUuid = id => (dispatch, getState) => {
  dispatch(updateBookingAction({ id }));

  const booking = getBooking(getState(), id);
  const hotelUuid = prop('hotelUuid', booking);
  const newBooking = pick(
    ['hotelUuid', 'hotelName', 'breakdown', 'startDate', 'endDate', 'guestFirstName', 'guestLastName'],
    booking
  );

  const guestFirstName = propOr('', 'guestFirstName', booking);
  const guestLastName = propOr('', 'guestLastName', booking);

  dispatch(successAction(BOOKING_UPDATE, { [id]: undefined }));

  // Triggers a booking builder call
  dispatch(updateBooking(hotelUuid, { guestFirstName, guestLastName, ...newBooking }));
};

export const requestBooking = id => async dispatch => {
  dispatch(genericAction(BOOKING_REQUEST, id));

  try {
    const {
      data: { data },
    } = await client.requestBooking(id);

    dispatch(successAction(BOOKING_REQUEST, { [id]: data }));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_REQUEST, e, `There was a problem requesting booking '${id}'.`));
  }
};

export const holdBooking = id => async dispatch => {
  dispatch(genericAction(BOOKING_HOLD, id));

  try {
    await client.holdBooking(id);

    dispatch(fetchBooking(id));
    dispatch(successAction(BOOKING_HOLD, {}));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_HOLD, e, `There was taking holds for booking '${id}'.`));
  }
};

export const completeAndHold = (
  id,
  payload,
  status = BookingStatusTypes.POTENTIAL,
  placeHolds = true
) => async dispatch => {
  dispatch(genericAction(BOOKING_REQUEST_WITH_HOLD, { id, payload }));

  await dispatch(completeBooking(id, payload, status, placeHolds));

  dispatch(successAction(BOOKING_REQUEST_WITH_HOLD, {}));
};

export const releaseBooking = id => async dispatch => {
  dispatch(genericAction(BOOKING_RELEASE, id));

  try {
    await client.releaseBooking(id);

    dispatch(fetchBooking(id));
    dispatch(successAction(BOOKING_RELEASE, {}));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_RELEASE, e, `There was a problem releasing holds on booking '${id}'.`));
  }
};

export const populateBooking = (id, data) => (dispatch, getState) => {
  dispatch(genericAction(BOOKING_POPULATE, { id, data }));
  const booking = getBooking(getState(), id);

  if (booking && propOr(false, 'touched', booking)) return;

  dispatch(successAction(BOOKING_POPULATE, { id, data }));
};
