import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { BOOKING_UPDATE, BOOKING_SUBMIT, BOOKING_CHECKS } from './actions';

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
  },
  initialState
);