import { createReducer, getErrorActionName, getSuccessActionName, getLoadingActionName } from 'store/utils';
import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';

import { PAGE } from './actions';

export default createReducer(
  {
    [getLoadingActionName(PAGE)]: loadingReducer,
    [getSuccessActionName(PAGE)]: successReducer,
    [getErrorActionName(PAGE)]: errorReducer,
  },
  initialState
);
