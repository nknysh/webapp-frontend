import { propOr, set, over, lensProp, lensPath, pipe } from 'ramda';
import { renameKeys } from 'ramda-adjunct';

import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { BOOKING_UPDATE, BOOKING_SUBMIT, BOOKING_CHECKS, BOOKING_RESET, BOOKINGS_SET, BOOKING_FETCH } from './actions';

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

export default createReducer(
  {
    [BOOKING_UPDATE]: loadingReducer,
    [getSuccessActionName(BOOKING_UPDATE)]: successReducer,
    [getErrorActionName(BOOKING_UPDATE)]: errorReducer,
    [BOOKING_FETCH]: loadingReducer,
    [getSuccessActionName(BOOKING_FETCH)]: successReducer,
    [getErrorActionName(BOOKING_FETCH)]: errorReducer,
    [BOOKING_CHECKS]: loadingReducer,
    [getSuccessActionName(BOOKING_CHECKS)]: successReducer,
    [getErrorActionName(BOOKING_CHECKS)]: errorReducer,
    [BOOKING_SUBMIT]: sendingReducer,
    [getSuccessActionName(BOOKING_SUBMIT)]: bookingComplete,
    [getErrorActionName(BOOKING_SUBMIT)]: errorReducer,
    [BOOKING_RESET]: bookingReset,
    [BOOKINGS_SET]: loadingReducer,
    [getSuccessActionName(BOOKINGS_SET)]: successReducer,
  },
  initialState
);
