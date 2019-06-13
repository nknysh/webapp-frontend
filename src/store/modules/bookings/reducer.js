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
  BOOKINGS_SET,
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
    set(lensPath(['data', id, 'data']), data),
    over(lensProp('data'), renameKeys({ [id]: propOr(id, 'uuid', data) })),
    set(lensProp('created'), { [id]: propOr(id, 'uuid', data) })
  )(state);

const bookingHoldsSuccess = (state, { payload }) =>
  mergeDeepRight(state, {
    status: Status.SUCCESS,
    holds: payload,
  });

export default createReducer(
  {
    [BOOKING_CHECKS]: loadingReducer,
    [BOOKING_FETCH]: loadingReducer,
    [BOOKING_HOLD]: sendingReducer,
    [BOOKING_RELEASE]: sendingReducer,
    [BOOKING_HOLDS_FETCH]: loadingReducer,
    [BOOKING_RESET]: bookingReset,
    [BOOKING_SUBMIT]: sendingReducer,
    [BOOKING_UPDATE]: loadingReducer,
    [BOOKINGS_SET]: loadingReducer,

    [getErrorActionName(BOOKING_CHECKS)]: errorReducer,
    [getErrorActionName(BOOKING_FETCH)]: errorReducer,
    [getErrorActionName(BOOKING_HOLD)]: errorReducer,
    [getErrorActionName(BOOKING_RELEASE)]: errorReducer,
    [getErrorActionName(BOOKING_HOLDS_FETCH)]: errorReducer,
    [getErrorActionName(BOOKING_SUBMIT)]: errorReducer,
    [getErrorActionName(BOOKING_UPDATE)]: errorReducer,

    [getSuccessActionName(BOOKING_CHECKS)]: successReducer,
    [getSuccessActionName(BOOKING_FETCH)]: successReducer,
    [getSuccessActionName(BOOKING_HOLD)]: successReducer,
    [getSuccessActionName(BOOKING_RELEASE)]: successReducer,
    [getSuccessActionName(BOOKING_HOLDS_FETCH)]: bookingHoldsSuccess,
    [getSuccessActionName(BOOKING_SUBMIT)]: bookingComplete,
    [getSuccessActionName(BOOKING_UPDATE)]: successReducer,
    [getSuccessActionName(BOOKINGS_SET)]: successReducer,
  },
  initialState
);
