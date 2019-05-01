import { prop, omit, lensPath, view, set } from 'ramda';
import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { BOOKING_UPDATE, BOOKING_SUBMIT, BOOKING_REMOVE, BOOKING_CHECKS, BOOKING_ROOM_REMOVE } from './actions';

const removeBooking = (state, { payload }) => ({
  ...state,
  data: omit([payload], prop('data', state)),
});

const removeRoomBooking = (state, { payload: { hotelUuid, id } }) => {
  const roomslens = lensPath(['data', hotelUuid, 'accommodationProducts']);
  return set(roomslens, omit([id], view(roomslens, state)), state);
};

export default createReducer(
  {
    [BOOKING_UPDATE]: loadingReducer,
    [getSuccessActionName(BOOKING_UPDATE)]: successReducer,
    [getErrorActionName(BOOKING_UPDATE)]: errorReducer,
    [BOOKING_CHECKS]: loadingReducer,
    [getSuccessActionName(BOOKING_CHECKS)]: successReducer,
    [getErrorActionName(BOOKING_CHECKS)]: errorReducer,
    [BOOKING_SUBMIT]: sendingReducer,
    [getErrorActionName(BOOKING_SUBMIT)]: errorReducer,
    [BOOKING_REMOVE]: removeBooking,
    [BOOKING_ROOM_REMOVE]: removeRoomBooking,
  },
  initialState
);
