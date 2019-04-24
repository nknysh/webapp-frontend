import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { COUNTRIES } from './actions';

export default createReducer(
  {
    [COUNTRIES]: loadingReducer,
    [getSuccessActionName(COUNTRIES)]: successReducer,
    [getErrorActionName(COUNTRIES)]: errorReducer,
  },
  initialState
);
