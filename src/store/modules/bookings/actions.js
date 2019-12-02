import {
  __,
  addIndex,
  adjust,
  all,
  allPass,
  anyPass,
  append,
  both,
  complement,
  concat,
  defaultTo,
  dissocPath,
  equals,
  evolve,
  filter,
  findLastIndex,
  forEach,
  fromPairs,
  has,
  hasPath,
  isEmpty,
  isNil,
  keys,
  last,
  lensPath,
  lensProp,
  map,
  mapObjIndexed,
  mergeDeepLeft,
  mergeDeepRight,
  objOf,
  omit,
  over,
  partial,
  path,
  pathOr,
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
  toPairs,
  toUpper,
  uniq,
  update,
  values,
  view,
  when,
  clone,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import client from 'api/bookings';
import baseClient from 'api';
import { ProductTypes, BookingStatusTypes } from 'config/enums';
import { formatDate, mapWithIndex, addDaysUTC } from 'utils';

import { getSearchDates, getSearchMealPlan } from 'store/modules/search/selectors';
import { getUserCountryContext } from 'store/modules/auth/selectors';
import { successAction, errorFromResponse, genericAction } from 'store/common';
import { USERS_FETCH } from 'store/modules/users/actions';

import {
  getBooking,
  getBookingForBuilder,
  getBookingForBuilderPure,
  getBookingMealPlanForRoomByType,
  getBookingsCreated,
  getBookingRoomsById,
} from './selectors';
import { addFinalDayToBooking } from './utils';

export const BOOKING_AMEND = 'BOOKING_AMEND';
export const BOOKING_CANCEL = 'BOOKING_CANCEL';
export const BOOKING_CHECKS = 'BOOKING_CHECKS';
export const BOOKING_CREATED_REMOVE = 'BOOKING_CREATED_REMOVE';
export const BOOKING_FETCH = 'BOOKING_FETCH';
export const BOOKING_HOLD = 'BOOKING_HOLD';
export const BOOKING_HOLDS_FETCH = 'BOOKING_HOLDS_FETCH';
export const BOOKING_POPULATE = 'BOOKING_POPULATE';
export const BOOKING_POPULATE_BULK = 'BOOKING_POPULATE_BULK';
export const BOOKING_RELEASE = 'BOOKING_RELEASE';
export const BOOKING_REMOVE = 'BOOKING_REMOVE';
export const BOOKING_REQUEST = 'BOOKING_REQUEST';
export const BOOKING_REQUEST_WITH_HOLD = 'BOOKING_WITH_HOLD';
export const BOOKING_RESET = 'BOOKING_RESET';
export const BOOKING_REVIEW = 'BOOKING_REVIEW';
export const BOOKING_ROOM_ADD = 'BOOKING_ROOM_ADD';
export const BOOKING_ROOM_REMOVE = 'BOOKING_ROOM_REMOVE';
export const BOOKING_ROOM_UPDATE = 'BOOKING_ROOM_UPDATE';
export const BOOKING_SUBMIT = 'BOOKING_SUBMIT';
export const BOOKING_UPDATE = 'BOOKING_UPDATE';
export const BOOKINGS_SET = 'BOOKINGS_SET';
export const BOOKINGS_FETCH = 'BOOKINGS_FETCH';
export const BACKWARDS_COMPAT = 'BACKWARDS_COMPAT';

const omitProps = [
  'agesOfAllChildren',
  'agreeToTerms',
  'availableToHold',
  'bookingComments',
  'bookingHash',
  'breakdown',
  'canBeBooked',
  'checkInDate',
  'checkOutDate',
  'clientUuid',
  'createdAt',
  'deletedAt',
  'hotelName',
  'hotelUuid',
  'internalComments',
  'marginApplied',
  'mustStop',
  'numAdults',
  'overrideTotal',
  'payment',
  'status',
  'touched',
  'updatedAt',
  'uuid',
];

/**
 * Prop is not empty or nil
 *
 * Function that waits for key and data
 *
 * @returns {Function}
 */
const propIsNotEmptyOrNil = complement(propSatisfies(isNilOrEmpty));

/**
 * Has start and end date
 *
 * Checks an object has both start and end date
 *
 * @param {object}
 * @returns {boolean}
 */
const hasStartAndEndDate = both(propIsNotEmptyOrNil('startDate'), propIsNotEmptyOrNil('endDate'));

/**
 * All have start and end date
 *
 * Checks that an array of objects all have start and end dates
 *
 * @param {Array<Object>}
 */
const allHaveStartAndEndDate = all(hasStartAndEndDate);

/**
 * Has accommodation
 *
 * Checks to see if a booking has accommodation products
 *
 * @param {object}
 * @returns {boolean}
 */
const hasAccommodation = allPass([
  // Has acommodation product key
  propIsNotEmptyOrNil(ProductTypes.ACCOMMODATION),
  pipe(
    propOr([], ProductTypes.ACCOMMODATION),
    allHaveStartAndEndDate
  ),
]);

/**
 * Ignore call
 *
 * List of predicates to determine if booking builder call should be ignored
 *
 * @param {object}
 * @returns {boolean}
 */
const ignoreCall = anyPass([has('marginApplied'), has('taMarginType'), has('taMarginAmount')]);

/**
 * Get hotel name
 *
 * @param {object}
 * @returns {string}
 */
const getHotelName = path(['breakdown', 'hotel', 'name']);

/**
 * Date evolve
 *
 * Evolution of end date that adds one day
 *
 * @param {object}
 * @returns {object}
 */
const dateEvolve = evolve({
  endDate: date => addDaysUTC(date, 1),
});

/**
 * Review evolve
 *
 * @param {object}
 * @returns {object}
 */
const reviewEvolve = evolve({
  overrideTotal: String,
});

/**
 * Products lens
 *
 * Returns a lens with the path to the product type
 *
 * @param {string} type
 * @returns {Function}
 */
const productsLens = type => lensPath(['breakdown', 'requestedBuild', type]);

/**
 * View products
 *
 * Takes a product lens and runs view aginst it
 *
 * @param {string} type
 * @param {object} data
 * @returns {*}
 */
const viewProducts = (type, data) => view(productsLens(type), data);

/**
 * Over products
 *
 * Takes a product lens, handler and data running over aginst it
 *
 * @param {string} type
 * @param {Function} handler
 * @param {object} data
 * @returns {object}
 */
const overProducts = (type, handler, data) => over(productsLens(type), handler, data);

/**
 * Set products
 *
 * Takes a product lens, handler and data running set aginst it
 *
 * @param {string} type
 * @param {Function} handler
 * @param {object} data
 * @returns {object}
 */
const setProducts = (type, handler, data) => set(productsLens(type), handler, data);

/**
 * Reduce meal plans
 *
 * @param {Array<String>} accum
 * @param {string} mealPlan
 * @returns {Array<String>}
 */
const reduceMealPlans = (accum, mealPlan) =>
  concat(accum, map(path(['product', 'uuid']), propOr([], 'breakdown', mealPlan)));

/**
 * Update booking action
 *
 * @param {object}
 * @param {object}
 * @returns {object}
 */
const updateBookingAction = partial(genericAction, [BOOKING_UPDATE]);

/**
 * Update room action
 *
 * @param {object}
 * @param {object}
 * @returns {object}
 */
const updateRoomAction = partial(genericAction, [BOOKING_ROOM_UPDATE]);

/**
 * Remove booking action
 *
 * @param {object}
 * @param {object}
 * @returns {object}
 */
export const removeBooking = partial(genericAction, [BOOKING_REMOVE]);

/**
 * Fetch bookings holds action
 *
 * @param {string} id Booking ID
 * @returns {Function}
 */
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

/**
 * Add Room action
 *
 * @param {string} hotelUuid Booking ID
 * @param {string} roomUuid Room UUID
 * @returns {Function}
 */
export const addRoom = (hotelUuid, roomUuid) => async (dispatch, getState) => {
  dispatch(genericAction(BOOKING_ROOM_ADD, { id: hotelUuid, uuid: roomUuid }));
  const state = getState();

  const booking = getBooking(state, hotelUuid);
  const prevRooms = getBookingRoomsById(state, hotelUuid, roomUuid);
  const prevRoom = !isNilOrEmpty(prevRooms) && last(prevRooms);

  let newRoomToBeAdded = null;
  const accommodationProduct = state.hotelAccommodationProducts.data.find(r => r.uuid === roomUuid);
  if (prevRoom) {
    // we have a previous room (which means we've already got a room of this accommodationProduct) which means:
    // - use the standard occupancy (adding always uses standard occupancy)
    // - merge over `prevRoom` for the rest of the data (dates, meal plans, etc.)
    newRoomToBeAdded = map(mergeDeepRight(prevRoom), [
      { guestAges: { numberOfAdults: accommodationProduct.occupancy.standardOccupancy, agesOfAllChildren: [] } },
    ]);
  } else {
    // this is the first room we're adding, so
    // - dates from the search
    // - use the standard occupancy (adding always uses standard occupancy)
    // - use the matching mealPlan from the hotelAccommodationProducts storage domain
    // - merge it all together with the UUID of the accommodation product

    const dates = map(formatDate, getSearchDates(state));
    newRoomToBeAdded = map(
      mergeDeepRight({
        ...dates,
        uuid: roomUuid,
        subProducts: {
          'Meal Plan': [
            {
              uuid: accommodationProduct.defaultMealPlanUuid,
            },
          ],
        },
      }),
      [{ guestAges: { numberOfAdults: accommodationProduct.occupancy.standardOccupancy, agesOfAllChildren: [] } }]
    );
  }

  // concat the new room into the Accommodation object
  const next = overProducts(
    ProductTypes.ACCOMMODATION,
    pipe(
      defaultTo([]),
      concat(__, newRoomToBeAdded)
    ),
    booking
  );

  // Update booking first to trigger BB call, which will pull down meal plans
  await dispatch(updateBooking(hotelUuid, pick(['breakdown'], next)));

  // Format meal plan so it's all uppercase
  const mealPlan = pipe(
    getSearchMealPlan,
    when(complement(isNilOrEmpty), toUpper)
  )(state);

  // If there is a meal plan, then we need to attach those as sub products
  if (!isNilOrEmpty(mealPlan)) {
    // Get the selected meal plan in this accommodation product type
    const roomMealPlans = getBookingMealPlanForRoomByType(state, hotelUuid, roomUuid, mealPlan);

    // Get the selected meal plans
    const selectedMealPlans = map(
      pipe(
        reduce(reduceMealPlans, []),
        uniq,
        map(objOf('uuid'))
      ),
      roomMealPlans
    );

    // This is current booking that will be manipulated
    const nextBooking = getBooking(state, hotelUuid);

    // Adds the meal plans to the booking
    const nextWithMealPlans = overProducts(
      ProductTypes.ACCOMMODATION,
      mapWithIndex((accom, i) =>
        when(
          complement(hasPath(['subProducts', ProductTypes.MEAL_PLAN])),
          // Adds the selected meal plans as sub products of the accommodation product selected
          mergeDeepLeft({ subProducts: { [ProductTypes.MEAL_PLAN]: propOr([], i, selectedMealPlans) } })
        )(accom)
      ),
      nextBooking
    );

    await dispatch(updateBooking(hotelUuid, pick(['breakdown'], nextWithMealPlans)));
  }
};

/**
 * Update room action
 *
 * Updates a room type (all instances of a room type)
 *
 * @param {string} id Booking ID
 * @param {string} uuid Room UUID
 * @param {object} payload
 * @returns {Function}
 */
export const updateRoom = (id, uuid, payload) => (dispatch, getState) => {
  dispatch(updateRoomAction({ id, uuid, payload }));

  const state = getState();
  const booking = getBooking(state, id);
  const accommodations = viewProducts(ProductTypes.ACCOMMODATION, booking);

  /**
   * Where UUID
   *
   * Function to see if prop equals supplied uuid
   *
   * @param {string}
   * @returns {boolean}
   */
  const whereUuid = propEq('uuid', uuid);

  const rooms = pipe(
    // Get all rooms with the supplied uuid
    filter(whereUuid),
    // Map over them and merge in the new data
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

/**
 * Update individual room action
 *
 * Updates a single room within a room type
 *
 * @param {string} id Booking ID
 * @param {string} uuid
 * @param {number} index
 * @param {object} payload
 * @returns {Function}
 */
export const updateIndividualRoom = (id, uuid, index, payload) => (dispatch, getState) => {
  dispatch(updateRoomAction({ id, uuid, index, payload }));

  const state = getState();
  const booking = getBooking(state, id);
  const accommodations = viewProducts(ProductTypes.ACCOMMODATION, booking);

  const whereUuid = propEq('uuid', uuid);

  // Preserve original indexes
  const originalIndexes = addIndex(reduce)(
    (accum, room, i) => (whereUuid(room) ? append(i, accum) : accum),
    [],
    accommodations
  );

  const rooms = pipe(
    filter(whereUuid),
    defaultTo([]),
    // Update the index with the new payload
    adjust(index, mergeDeepLeft(payload))
  )(accommodations);

  // Replace the rooms with new data
  const next = overProducts(ProductTypes.ACCOMMODATION, update(originalIndexes[index], rooms[index]), booking);

  dispatch(updateBooking(id, pick(['breakdown'], next)));
};

/**
 * Remove room action
 *
 * Removes a room from the selected room types. If passed
 * all then will remove all of a room type
 *
 * @param {string} id Booking ID
 * @param {string} uuid
 * @param {boolean} all
 * @returns {Function}
 */
export const removeRoom = (id, uuid, all = false) => (dispatch, getState) => {
  dispatch(genericAction(BOOKING_ROOM_REMOVE, { id, uuid }));

  const state = getState();
  const booking = getBooking(state, id);

  const accommodations = defaultTo([], viewProducts(ProductTypes.ACCOMMODATION, booking));
  const lastIndex = findLastIndex(propEq('uuid', uuid), accommodations);
  const next = overProducts(
    ProductTypes.ACCOMMODATION,
    // Either remove all or remove the last of type
    all ? reject(propEq('uuid', uuid)) : remove(lastIndex, 1),
    booking
  );

  const nextProducts = viewProducts(ProductTypes.ACCOMMODATION, next);

  dispatch(updateBooking(id, pick(['breakdown'], next)));

  isEmpty(nextProducts) && dispatch({ type: BOOKING_RESET, payload: { id } });
};

/**
 * Replace products action
 *
 * Replaces all products of a specific type
 *
 * @param {string} id Booking ID
 * @param {string} type
 * @param {object} payload
 * @returns {Function}
 */
export const replaceProducts = (id, type, payload) => (dispatch, getState) => {
  const state = getState();
  const booking = getBooking(state, id);

  const next = setProducts(type, payload, booking);

  dispatch(updateBooking(id, pick(['breakdown'], next)));
};

/**
 * Update booking action
 *
 * This is the main action for the booking flow.  Responsible for formatting the
 * data in a booking object and passing it on to the booking builder
 *
 * @param {string} id Booking ID
 * @param {object} payload
 * @param {boolean} forceCall
 * @returns {Function}
 */
export const updateBooking = (id, payload, forceCall = false) => async (dispatch, getState) => {
  dispatch(updateBookingAction(payload));

  // Success fast if nothing was passed to update booking
  if (!payload) return dispatch(successAction(BOOKING_UPDATE, {}));

  const state = getState();

  const prevBooking = getBooking(state, id);

  // If there is no hotel info then we assume the booking ID is the hotel ID
  const hotelUuid = propOr(id, 'hotelUuid', prevBooking);

  let nextBooking = {
    ...payload,
    hotelUuid,
    hotelName: getHotelName(prevBooking),
    touched: false,
  };

  const nextState = over(
    lensPath(['bookings', 'data', id]),
    pipe(
      defaultTo({}),
      mergeDeepLeft(nextBooking)
    ),
    state
  );

  const bookingBuilderPayload = getBookingForBuilderPure(nextState, id);

  const withAccommodation = hasAccommodation(bookingBuilderPayload);

  // Whether there should be a booking builder call
  const shouldCall = forceCall || (!ignoreCall(payload) && withAccommodation);

  const actingCountryCode = getUserCountryContext(state);
  let breakdown = {};

  try {
    const response =
      shouldCall &&
      (await client.bookingBuilder({ data: { attributes: { ...bookingBuilderPayload } } }, { actingCountryCode }));

    // If there was no accommodation then we need to set the potentialBooking accommodation key to empty
    if (!withAccommodation) {
      breakdown = set(lensPath(['potentialBooking', ProductTypes.ACCOMMODATION]), [], breakdown);
    }

    if (response) {
      const {
        data: { data },
      } = response;

      // Replace the breakdown with the new data
      breakdown = data;

      // if we have aggregate totals, we need to completely overwrite that in the breakdown
      // to ensure it is fully updated, otherwise we might no longer have a total but it is
      // kept in state

      // Hotel name needs to be pulled from the hotel object
      nextBooking.hotelName = path(['hotel', 'name'], breakdown);
    }
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_UPDATE, e, 'Could not update booking. Please try again later.'));
    return;
  }

  dispatch(successAction(BOOKING_UPDATE, { [id]: mergeDeepRight(nextBooking, { breakdown }) }));
};

/**
 * Complete booking action
 *
 * @param {string} id Booking ID
 * @param {object} payload
 * @param {string} status
 * @param {boolean} placeHolds
 * @returns {Function}
 */
export const completeBooking = (id, payload, status = BookingStatusTypes.REQUESTED, placeHolds = false) => async (
  dispatch,
  getState
) => {
  await dispatch(updateBooking(id, payload));

  const state = getState();

  const booking = getBooking(state, id);
  const { breakdown } = booking;

  const bookingBuild = getBookingForBuilder(state, id);
  const bookingHash = prop('bookingHash', breakdown);

  // attempt to get a bookingHash if none exists
  // TODO 1043 why would this scenario ever happen
  if (!bookingHash) await dispatch(updateBooking(id), {});

  // Get the booking information from the booking object.  This is the final screen
  // in the booking flow
  const bookingInformation = pipe(
    omit(omitProps),
    // Extract the special request keys and only use
    // ones that are true
    over(
      lensProp('specialRequests'),
      pipe(
        pickBy(equals(true)),
        keys
      )
    ),
    toPairs,
    // Filter out empty keys
    reject(
      pipe(
        last,
        isNil
      )
    ),
    fromPairs
  )(booking);

  // Final payload is the object that the backend will accept
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

/**
 * Set bookings action
 *
 * Sets bookings from proposals
 *
 * @param {object} data
 * @returns {Function}
 */
export const setBookings = data => dispatch => {
  dispatch(genericAction(BOOKINGS_SET, bookings));

  // Adds the missing day in the proposal bookings data that is returned
  const bookings = mapObjIndexed(addFinalDayToBooking, data);

  forEach(({ uuid }) => {
    dispatch(fetchBookingHolds(uuid));
  }, values(bookings));

  dispatch(successAction(BOOKINGS_SET, bookings));
};

/**
 * Fetch booking action
 *
 * @param {string} id Booking ID
 * @returns {Function}
 */
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

/**
 * Cancel booking action
 *
 * @param {string} id Booking ID
 * @returns {Function}
 */
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

/**
 * Booking to Hotel UUID
 *
 * Changes a bookings ID from hotel uuid to booking uuiid
 *
 * @param {string} id Booking ID
 * @returns {Function}
 */
export const bookingToHotelUuid = id => (dispatch, getState) => {
  dispatch(updateBookingAction({ id }));

  const booking = getBooking(getState(), id);
  const hotelUuid = prop('hotelUuid', booking);

  // Pick only the data we need from the booking
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

/**
 * Request booking action
 *
 * @param {string} id Booking ID
 * @returns {Function}
 */
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

/**
 * Hold booking action
 *
 * @param {string} id Booking ID
 * @returns {Function}
 */
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

/**
 * Complete and hold action
 *
 * Action that combines completing a booking and taking a hold in one function
 *
 * @param {string} id Booking ID
 * @param {object} payload
 * @param {string} status
 * @param {boolean} placeHolds
 * @returns {Function}
 */
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

/**
 * Release booking action
 *
 * @param {string} id Booking ID
 * @returns {Function}
 */
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

/**
 * Populate booking action
 *
 * When a search result comes in, this actions is used to pre-populated booking
 * objects so that if a user goes through to the hotel, the booking is prepopulated
 *
 * @param {string} id Booking ID
 * @param {object} data
 * @returns {Function}
 */
export const populateBooking = (id, data) => (dispatch, getState) => {
  dispatch(genericAction(BOOKING_POPULATE, { id, data }));
  const booking = getBooking(getState(), id);

  // Bookings have a touched flag.  If false, then we can update this booking
  // with the new booking object from the search.  If it's true then the user has amended
  // this booking already and we should leave it as it is
  if (booking && propOr(false, 'touched', booking)) return;

  const next = pipe(
    // Adds the extra day to the top level date
    over(lensPath(['breakdown', 'requestedBuild']), dateEvolve),

    // Adds the extra date to the internal dates
    over(lensPath(['breakdown', 'requestedBuild', ProductTypes.ACCOMMODATION]), map(dateEvolve))
  )(data);

  dispatch(successAction(BOOKING_POPULATE, { id, data: next }));
};

export const populateBookingBulk = data => {
  const dataWithDates = map(
    pipe(
      // Adds the extra day to the top level date
      over(lensPath(['breakdown', 'requestedBuild']), dateEvolve),

      // Adds the extra date to the internal dates
      over(lensPath(['breakdown', 'requestedBuild', ProductTypes.ACCOMMODATION]), map(dateEvolve))
    )
  )(data);

  return {
    type: BOOKING_POPULATE_BULK,
    payload: {
      data: dataWithDates,
    },
  };
};

/**
 * Clear created booking action
 *
 * This will remove the booking from the list of created bookings
 * in redux.
 *
 * @param {string} id Booking ID
 * @returns {Function}
 */
export const clearCreatedBooking = id => (dispatch, getState) => {
  dispatch(genericAction(BOOKING_CREATED_REMOVE, { id }));
  const created = getBookingsCreated(getState());

  const next = pipe(
    toPairs,
    // Get only the booking with this hotelId
    reduce((accum, [hotelId, bookingId]) => (equals(bookingId, id) ? [hotelId] : accum), null),

    // Omit it from the created key
    when(complement(isNilOrEmpty), omit(__, created))
  );

  dispatch(successAction(BOOKING_CREATED_REMOVE, next));
};

/**
 * Amend booking action
 *
 * @param {string} id Booking ID
 * @param {object} data
 * @returns {Function}
 */
export const amendBooking = (id, data) => async dispatch => {
  dispatch(genericAction(BOOKING_AMEND, { id, data }));

  try {
    await client.amendBooking(id, { data: { attributes: data } });

    dispatch(fetchBooking(id));
    dispatch(successAction(BOOKING_AMEND, {}));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_AMEND, e, `There was a problem releasing holds on booking '${id}'.`));
  }
};

/**
 * Review booking action
 *
 * @param {string} id Booking ID
 * @param {object} data
 * @returns {Function}
 */
export const reviewBooking = (id, data) => async dispatch => {
  dispatch(genericAction(BOOKING_REVIEW, { id, data }));

  try {
    await client.reviewBooking(id, { data: { attributes: reviewEvolve(data) } });

    dispatch(fetchBooking(id));
    dispatch(successAction(BOOKING_REVIEW, {}));
  } catch (e) {
    dispatch(errorFromResponse(BOOKING_AMEND, e, `There was a problem updating booking '${id}'. Please try again.`));
  }
};

/**
 * Fetch bookings action
 *
 * @param {object} params
 * @returns {Function}
 */
export const fetchBookings = params => async dispatch => {
  dispatch(genericAction(BOOKINGS_FETCH, {}));

  try {
    const {
      data: { data },
    } = await client.getBookings(params);

    const bookings = over(
      lensPath(['entities', 'bookings']),
      pipe(
        defaultTo([]),
        map(
          pipe(
            // Add the final day to top level
            over(lensPath(['breakdown', 'requestedBuild']), dateEvolve),

            // Add the final day to internal dates
            over(
              lensPath(['breakdown', 'requestedBuild', ProductTypes.ACCOMMODATION]),
              pipe(
                defaultTo([]),
                map(dateEvolve)
              )
            )
          )
        )
      ),
      data
    );

    // Get users entities from payload by removing bookings entities and result
    const users = pipe(
      dissocPath(['entities', 'bookings']),
      dissocPath(['result'])
    )(bookings);

    await dispatch(successAction(USERS_FETCH, users));
    dispatch(successAction(BOOKINGS_FETCH, path(['entities', 'bookings'], bookings)));
  } catch (e) {
    dispatch(errorFromResponse(BOOKINGS_FETCH, e, 'There was a problem fetching bookings.'));
    throw e;
  }
};

/**
 * for a guestAgeSet, return the full requestedBuild.Accommodation object
 * for that age set, with the guestAges overwritten to the new guestAgeSet
 *
 * @param {object} newGuestAgeSet
 * @param {number} guestAgeSet.numberOfAdults
 * @param {number[]} guestAgeSet.agesOfAllChildren
 * @param {object} oldRequestBuildAccommodation
 */
export const mapGuestAgeSetToAccommodationRoom = (newGuestAgeSet, oldRequestBuildAccommodation) => {
  oldRequestBuildAccommodation.guestAges = newGuestAgeSet;

  return oldRequestBuildAccommodation;
};

/**
 * for a given guestAgeSet, build a URL that will hit the occupancy checker
 * for that guestAgeSet
 *
 * @param {object} accommodationRecord
 * @param {number} guestAgeSet.guestAges.numberOfAdults
 * @param {number[]} guestAgeSet.guestAges.agesOfAllChildren
 */
export const buildOccupancyCheckUrlForAccommodationProduct = (accommodationRecord, accommodationProductUuid) => {
  if (!accommodationRecord || !accommodationRecord.guestAges || !accommodationProductUuid) {
    return null;
  }

  let url = `/accommodation-products/${accommodationProductUuid}/occupancy-check/ages?numberOfAdults=${accommodationRecord.guestAges.numberOfAdults}`;

  if (accommodationRecord.guestAges.agesOfAllChildren && accommodationRecord.guestAges.agesOfAllChildren.length >= 1) {
    url += '&' + accommodationRecord.guestAges.agesOfAllChildren.map(age => `agesOfAllChildren[]=${age}`).join('&');
  }

  return url;
};

/**
 * for an array of responses from the occupancy check endpoint, return a nested array of errors
 * - level 1 is in the index of the room the errors are for
 * - level 2 is the errors themselves
 * @param {Response[]} checkResponses
 * @param {string[]} checkResponses[].data.data.errors
 */
export const getAllErrorsFromCheckResponses = checkResponses => {
  if (!checkResponses || checkResponses.length <= 0) {
    return [];
  }
  const errors = checkResponses
    .map(checkResponse => {
      return checkResponse.data.data.errors;
    })
    .filter(e => e && e.length >= 1);

  return errors;
};

/**
 * given an array of guest age sets, update the booking store with that new information
 *
 * this function also calls out the occupancy checker endpoint, and stores any errors for
 * the new guestAgeSets in the store to be displayed later
 *
 * @param {string} hotelUuid
 * @param {string} accommodationProductUuid
 * @param {object[]} newGuestAgeSets
 * @param {number} newGuestAgeSets[].numberOfAdults
 * @param {number[]} newGuestAgeSets[].agesOfAllChildren
 */
export const updateAccommodationProductGuestAgeSets = (hotelUuid, accommodationProductUuid, newGuestAgeSets) => async (
  dispatch,
  getState
) => {
  const state = getState();

  // get the current bookings.data.[hotelUuid].breakdown.requestedBuild.Accommodation records
  // out of the store
  const currentRequestedBuildAccommodation = pathOr(
    [],
    ['bookings', 'data', hotelUuid, 'breakdown', 'requestedBuild', 'Accommodation'],
    state
  );

  // if there are more new guest sets than there are current Accommodation records, it means
  // we're adding a room - in that case, just call addRoom and return
  if (newGuestAgeSets.length > currentRequestedBuildAccommodation.length) {
    return addRoom(hotelUuid, accommodationProductUuid)(dispatch, getState);
  }

  // for each new guest age set, use it to overwrite
  // the matching Accommodation record's `guestAges`
  const newAccommodationProductSets = newGuestAgeSets
    .map((guestAgeSet, index) => {
      if (!currentRequestedBuildAccommodation[index]) {
        return null;
      }
      return mapGuestAgeSetToAccommodationRoom(guestAgeSet, currentRequestedBuildAccommodation[index]);
    })
    .filter(i => i !== null);

  // then we check for any occupancy errors with the new records...
  const checkRequests = newAccommodationProductSets.map(updatedAccommodationProduct =>
    baseClient.get(buildOccupancyCheckUrlForAccommodationProduct(updatedAccommodationProduct, accommodationProductUuid))
  );

  const checkResponses = await Promise.all(checkRequests);

  // ...and store any errors into the store
  const errors = getAllErrorsFromCheckResponses(checkResponses);
  dispatch({
    type: 'SET_BOOKING_OCCUPANCY_CHECK_ERRORS',
    payload: {
      hotelUuid,
      errors,
    },
  });

  // finally, we build a payload in the format needed by the `updateBooking` function
  // and dispatch an update booking action to update the booking
  const payload = {
    breakdown: {
      requestedBuild: {
        Accommodation: newAccommodationProductSets,
      },
    },
  };

  return updateBooking(hotelUuid, payload)(dispatch, getState);
};

export const updateRequestedBuildLodgingGuestAges = (hotelUuid, lodgingIndex, newGuestAges) => async (
  dispatch,
  getState
) => {
  const state = getState();

  // get the current bookings.data.[hotelUuid].breakdown.requestedBuild.Accommodation records
  // out of the store, and then amend the one with the matching index
  const requestedBuildAccommodation = pathOr(
    [],
    ['bookings', 'data', hotelUuid, 'breakdown', 'requestedBuild', 'Accommodation'],
    state
  );
  const lodgingToAmend = requestedBuildAccommodation[lodgingIndex];
  lodgingToAmend.guestAges = newGuestAges;
  requestedBuildAccommodation[lodgingIndex] = lodgingToAmend;

  // finally, we build a payload in the format needed by the `updateBooking` function
  // and dispatch an update booking action to update the booking
  const payload = {
    breakdown: {
      requestedBuild: {
        Accommodation: requestedBuildAccommodation,
      },
    },
  };

  return updateBooking(hotelUuid, payload)(dispatch, getState);
};

export const updateRequestedBuildLodgingDates = (hotelUuid, lodgingIndex, startDate, endDate) => async (
  dispatch,
  getState
) => {
  const state = getState();

  // get the current bookings.data.[hotelUuid].breakdown.requestedBuild.Accommodation records
  // out of the store, and then amend the one with the matching index
  const requestedBuildAccommodation = pathOr(
    [],
    ['bookings', 'data', hotelUuid, 'breakdown', 'requestedBuild', 'Accommodation'],
    state
  );
  const lodgingToAmend = requestedBuildAccommodation[lodgingIndex];
  lodgingToAmend.startDate = formatDate(startDate);
  lodgingToAmend.endDate = formatDate(endDate);
  requestedBuildAccommodation[lodgingIndex] = lodgingToAmend;

  // finally, we build a payload in the format needed by the `updateBooking` function
  // and dispatch an update booking action to update the booking
  const payload = {
    breakdown: {
      requestedBuild: {
        Accommodation: requestedBuildAccommodation,
      },
    },
  };

  return updateBooking(hotelUuid, payload)(dispatch, getState);
};

export const updateRequestedBuildLodgingMealPlan = (hotelUuid, lodgingIndex, mealPlanUuids) => async (
  dispatch,
  getState
) => {
  const state = getState();

  // get the current bookings.data.[hotelUuid].breakdown.requestedBuild.Accommodation records
  // out of the store, and then amend the one with the matching index
  const requestedBuildAccommodation = pathOr(
    [],
    ['bookings', 'data', hotelUuid, 'breakdown', 'requestedBuild', 'Accommodation'],
    state
  );
  const lodgingToAmend = clone(requestedBuildAccommodation[lodgingIndex]);

  lodgingToAmend.subProducts['Meal Plan'] = mealPlanUuids.map(mealPlanUuid => {
    return {
      uuid: mealPlanUuid,
    };
  });

  requestedBuildAccommodation[lodgingIndex] = lodgingToAmend;

  // finally, we build a payload in the format needed by the `updateBooking` function
  // and dispatch an update booking action to update the booking
  const payload = {
    breakdown: {
      requestedBuild: {
        Accommodation: requestedBuildAccommodation,
      },
    },
  };

  return updateBooking(hotelUuid, payload)(dispatch, getState);
};

export const removeLodging = (hotelUuid, lodgingIndex) => async (dispatch, getState) => {
  const state = getState();

  const requestedBuildAccommodation = pathOr(
    [],
    ['bookings', 'data', hotelUuid, 'breakdown', 'requestedBuild', 'Accommodation'],
    state
  );

  requestedBuildAccommodation.splice(lodgingIndex, 1);

  const payload = {
    breakdown: {
      requestedBuild: {
        Accommodation: requestedBuildAccommodation,
      },
    },
  };

  return updateBooking(hotelUuid, payload)(dispatch, getState);
};

export const updateBookingOccasions = (hotelUuid, lodgingIndex, occasions) => async (dispatch, getState) => {
  const state = getState();

  const requestedBuildAccommodation = pathOr(
    [],
    ['bookings', 'data', hotelUuid, 'breakdown', 'requestedBuild', 'Accommodation'],
    state
  );

  let lodgingToAmend = requestedBuildAccommodation[lodgingIndex];

  lodgingToAmend = { ...lodgingToAmend, ...occasions };

  requestedBuildAccommodation[lodgingIndex] = lodgingToAmend;

  const payload = {
    breakdown: {
      requestedBuild: {
        Accommodation: requestedBuildAccommodation,
      },
    },
  };

  return updateBooking(hotelUuid, payload)(dispatch, getState);
};

export const backwardCompatBookingBuilderAction = (hotelUuid, request, response) => {
  return {
    type: BACKWARDS_COMPAT,
    payload: {
      hotelUuid,
      request,
      response,
    },
  };
};
