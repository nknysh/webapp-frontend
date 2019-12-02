import { propOr, set, over, lensProp, lensPath, pipe, mergeDeepRight } from 'ramda';
import { renameKeys } from 'ramda-adjunct';

import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer, Status } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import {
  BOOKING_CHECKS,
  BOOKING_FETCH,
  BOOKING_HOLD,
  BOOKING_HOLDS_FETCH,
  BOOKING_RELEASE,
  BOOKING_RESET,
  BOOKING_SUBMIT,
  BOOKING_UPDATE,
  BOOKING_POPULATE,
  BOOKING_POPULATE_BULK,
  BOOKINGS_SET,
  BOOKING_CREATED_REMOVE,
  BOOKING_REQUEST,
  BOOKINGS_FETCH,
  BACKWARDS_COMPAT,
} from './actions';

/**
 * Booking reset reducer
 *
 * Clear out booking key but leave second level keys
 *
 * @param {object} state
 * @param {object}
 * @returns {object}
 */
const bookingReset = (state, { payload: { id } }) => ({
  ...state,
  data: {
    ...propOr({}, 'data', state),
    [id]: {
      breakdown: {
        errors: [],
        potentialBooking: {},
        availableProductSets: {},
        canBeBooked: false,
        totals: {},
      },
    },
  },
});

/**
 * Booking complete reducer
 *
 * Sets status to success and data to the key
 *
 * @param {object} state
 * @param {object}
 * @returns {object}
 */
const bookingComplete = (state, { payload: { id, data } }) =>
  pipe(
    set(lensProp('status'), Status.SUCCESS),
    set(lensPath(['data', id]), data),
    // Sets the id in bookings state to be the booking uuid, not the htoel uuid
    over(lensProp('data'), renameKeys({ [id]: propOr(id, 'uuid', data) })),
    // Adds this booking to the created keys as hotelUuid => bookingUuid
    set(lensProp('created'), { [id]: propOr(id, 'uuid', data) })
  )(state);

/**
 * Booking holds success reducer
 *
 * Adds/merges holds for bookings to a new key
 *
 * @param {object} state
 * @param {object}
 * @returns {object}
 */
const bookingHoldsSuccess = (state, { payload }) =>
  mergeDeepRight(state, {
    status: Status.SUCCESS,
    holds: payload,
  });

/**
 * Populate booking reducer
 *
 * Sets data to specified id in bookings key
 *
 * @param {object} state
 * @param {object}
 * @returns {object}
 */
const populateBooking = (state, { payload: { id, data } }) => set(lensPath(['data', id]), data, state);

const populateBookingBulkReducer = (state, { payload: { data } }) => set(lensPath(['data']), data, state);

/**
 * Remove created booking reducer
 *
 * Removes bookings that have been created
 *
 * @param {object} state
 * @param {object}
 * @returns {object}
 */
const removeCreatedBooking = (state, { payload }) => set(lensProp('created'), payload, state);

/**
 *
 * @param {object} state the entire bookings state
 * @param {object} payload action payload
 * @param {object} payload.payload action nested payload
 * @param {object[]} payload.payload.errors the errors from the occupancy check
 * @param {string} payload.payload.hotelUuid the hotel UUID we had when we were editing
 */
const setBookingOccupancyCheckErrors = (state, payload) => {
  // we set these against the whole bookings state, instead of just against a hotel.
  // its arguable against a hotel is "more" correct, but we cant close this modal with any errors
  // anyway (thats the whole point) and keeping them here is simpler and faster
  state.occupancyCheckErrors = payload.payload.errors.length >= 1 ? payload.payload.errors : null;
  return state;
};

const backwardCompatBookingBuilderReducer = (state, action) => {
  const { hotelUuid, request, response, marginType, marginAmount } = action.payload;

  const data = {
    hotelUuid,
    hotelName: response.hotel.name,
    taMarginType: marginType,
    taMarginAmount: marginAmount,
    breakdown: {
      requestedBuild: {
        ...request,
      },
      ...response,
    },
  };

  state.data = {
    [hotelUuid]: data,
  };

  return state;
};

export default createReducer(
  {
    [BOOKING_CHECKS]: loadingReducer,
    [BOOKING_FETCH]: loadingReducer,
    [BOOKING_HOLD]: sendingReducer,
    [BOOKING_HOLDS_FETCH]: loadingReducer,
    [BOOKING_RELEASE]: sendingReducer,
    [BOOKING_REQUEST]: loadingReducer,
    [BOOKING_RESET]: bookingReset,
    [BOOKING_SUBMIT]: sendingReducer,
    [BOOKING_UPDATE]: loadingReducer,
    [BOOKINGS_SET]: loadingReducer,
    [BOOKINGS_FETCH]: loadingReducer,
    [BOOKING_POPULATE_BULK]: populateBookingBulkReducer,
    [BACKWARDS_COMPAT]: backwardCompatBookingBuilderReducer,

    [getErrorActionName(BOOKING_CHECKS)]: errorReducer,
    [getErrorActionName(BOOKING_FETCH)]: errorReducer,
    [getErrorActionName(BOOKING_HOLD)]: errorReducer,
    [getErrorActionName(BOOKING_HOLDS_FETCH)]: errorReducer,
    [getErrorActionName(BOOKING_RELEASE)]: errorReducer,
    [getErrorActionName(BOOKING_REQUEST)]: errorReducer,
    [getErrorActionName(BOOKING_SUBMIT)]: errorReducer,
    [getErrorActionName(BOOKING_UPDATE)]: errorReducer,
    [getErrorActionName(BOOKINGS_FETCH)]: errorReducer,

    [getSuccessActionName(BOOKING_CHECKS)]: successReducer,
    [getSuccessActionName(BOOKING_CREATED_REMOVE)]: removeCreatedBooking,
    [getSuccessActionName(BOOKING_FETCH)]: successReducer,
    [getSuccessActionName(BOOKING_HOLD)]: successReducer,
    [getSuccessActionName(BOOKING_HOLDS_FETCH)]: bookingHoldsSuccess,
    [getSuccessActionName(BOOKING_POPULATE)]: populateBooking,
    [getSuccessActionName(BOOKING_RELEASE)]: successReducer,
    [getSuccessActionName(BOOKING_REQUEST)]: successReducer,
    [getSuccessActionName(BOOKING_SUBMIT)]: bookingComplete,
    [getSuccessActionName(BOOKING_UPDATE)]: successReducer,
    [getSuccessActionName(BOOKINGS_SET)]: successReducer,
    [getSuccessActionName(BOOKINGS_FETCH)]: successReducer,

    SET_BOOKING_OCCUPANCY_CHECK_ERRORS: setBookingOccupancyCheckErrors,
  },
  initialState
);
