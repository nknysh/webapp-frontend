import { createReducer, getErrorActionName, getSuccessActionName, getLoadingActionName } from 'store/utils';
import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';

import { OFFERS_LATEST } from './actions';

export default createReducer(
  {
    [getLoadingActionName(OFFERS_LATEST)]: loadingReducer,
    [getSuccessActionName(OFFERS_LATEST)]: successReducer,
    [getErrorActionName(OFFERS_LATEST)]: errorReducer,
  },
  initialState
);
