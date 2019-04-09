import { prop, omit } from 'ramda';
import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { BOOKING_UPDATE, BOOKING_SUBMIT, BOOKING_REMOVE } from './actions';

const removeBooking = (state, { payload }) => ({
  ...state,
  data: omit([payload], prop('data', state)),
});

export default createReducer(
  {
    [BOOKING_UPDATE]: loadingReducer,
    [getSuccessActionName(BOOKING_UPDATE)]: successReducer,
    [getErrorActionName(BOOKING_UPDATE)]: errorReducer,
    [BOOKING_SUBMIT]: sendingReducer,
    [getErrorActionName(BOOKING_SUBMIT)]: errorReducer,
    [BOOKING_REMOVE]: removeBooking,
  },
  initialState
);
