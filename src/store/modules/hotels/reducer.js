import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { FETCH_HOTELS } from './actions';

export default createReducer(
  {
    [FETCH_HOTELS]: loadingReducer,
    [getSuccessActionName(FETCH_HOTELS)]: successReducer,
    [getErrorActionName(FETCH_HOTELS)]: errorReducer,
  },
  initialState
);
