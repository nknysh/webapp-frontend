import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';
import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';

import { FETCH_LATEST_OFFERS } from './actions';

export default createReducer(
  {
    [FETCH_LATEST_OFFERS]: loadingReducer,
    [getSuccessActionName(FETCH_LATEST_OFFERS)]: successReducer,
    [getErrorActionName(FETCH_LATEST_OFFERS)]: errorReducer,
  },
  initialState
);
