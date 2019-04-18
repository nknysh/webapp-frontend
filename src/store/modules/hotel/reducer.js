import { prop } from 'ramda';

import {
  initialState as baseInitialState,
  loadingReducer,
  errorReducer,
  successResetReducer,
  Status,
} from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import schema from 'store/modules/hotels/schema';

import { HOTEL, HOTEL_ROOMS } from './actions';

const initialState = {
  ...baseInitialState,
  id: undefined,
};

export const setId = (state, { payload }) => ({
  ...state,
  status: Status.SUCCESS,
  id: prop(prop('id', schema), payload),
});

export default createReducer(
  {
    [HOTEL]: loadingReducer,
    [getSuccessActionName(HOTEL)]: setId,
    [getErrorActionName(HOTEL)]: errorReducer,
    [HOTEL_ROOMS]: loadingReducer,
    [getSuccessActionName(HOTEL_ROOMS)]: successResetReducer,
    [getErrorActionName(HOTEL_ROOMS)]: errorReducer,
  },
  initialState
);
