import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { HOTELS } from './actions';

export default createReducer(
  {
    [HOTELS]: loadingReducer,
    [getSuccessActionName(HOTELS)]: successReducer,
    [getErrorActionName(HOTELS)]: errorReducer,
  },
  initialState
);
