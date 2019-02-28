import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';
import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';

import { FETCH_PAGE } from './actions';

export default createReducer(
  {
    [FETCH_PAGE]: loadingReducer,
    [getSuccessActionName(FETCH_PAGE)]: successReducer,
    [getErrorActionName(FETCH_PAGE)]: errorReducer,
  },
  initialState
);
