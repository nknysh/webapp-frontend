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
  BOOKINGS_SET,
  BOOKING_CREATED_REMOVE,
  BOOKING_REQUEST,
  BOOKINGS_FETCH,
} from './actions';

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

const bookingComplete = (state, { payload: { id, data } }) =>
  pipe(
    set(lensProp('status'), Status.SUCCESS),
    set(lensPath(['data', id]), data),
    over(lensProp('data'), renameKeys({ [id]: propOr(id, 'uuid', data) })),
    set(lensProp('created'), { [id]: propOr(id, 'uuid', data) })
  )(state);

const bookingHoldsSuccess = (state, { payload }) =>
  mergeDeepRight(state, {
    status: Status.SUCCESS,
    holds: payload,
  });

const populateBooking = (state, { payload: { id, data } }) => set(lensPath(['data', id]), data, state);

const removeCreatedBooking = (state, { payload }) => set(lensProp('created'), payload, state);

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
  },
  initialState
);
