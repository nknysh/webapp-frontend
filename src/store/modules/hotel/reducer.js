import { prop } from 'ramda';

import { initialState as baseInitialState, loadingReducer, errorReducer, Status } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import schema from 'store/modules/hotels/schema';

import { FETCH_HOTEL } from './actions';

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
    [FETCH_HOTEL]: loadingReducer,
    [getSuccessActionName(FETCH_HOTEL)]: setId,
    [getErrorActionName(FETCH_HOTEL)]: errorReducer,
  },
  initialState
);
