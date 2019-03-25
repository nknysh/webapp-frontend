import { mergeDeepRight } from 'ramda';

import { successAction } from 'store/common';

import { getBookingData } from './selectors';

export const BOOKING_UPDATE = 'BOOKING_UPDATE';

export const updateBookingAction = payload => ({
  type: BOOKING_UPDATE,
  payload,
});

export const updateBooking = (id, payload) => (dispatch, getState) => {
  const state = getState();

  dispatch(updateBookingAction(payload));
  dispatch(successAction(BOOKING_UPDATE, mergeDeepRight(getBookingData(state), { [id]: payload })));
};
