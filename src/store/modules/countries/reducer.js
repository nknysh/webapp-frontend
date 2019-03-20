import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { SET_COUNTRIES } from './actions';

export default createReducer(
  {
    [SET_COUNTRIES]: loadingReducer,
    [getSuccessActionName(SET_COUNTRIES)]: successReducer,
    [getErrorActionName(SET_COUNTRIES)]: errorReducer,
  },
  initialState
);
