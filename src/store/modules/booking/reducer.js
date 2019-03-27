import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { BOOKING_UPDATE } from './actions';

export default createReducer(
  {
    [BOOKING_UPDATE]: loadingReducer,
    [getSuccessActionName(BOOKING_UPDATE)]: successReducer,
    [getErrorActionName(BOOKING_UPDATE)]: errorReducer,
  },
  initialState
);
