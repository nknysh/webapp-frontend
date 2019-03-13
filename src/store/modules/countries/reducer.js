import { pipe, prop } from 'ramda';

import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName, normalizer } from 'store/utils';

import schema from './schema';

import { SET_COUNTRIES } from './actions';

export default createReducer(
  {
    [SET_COUNTRIES]: loadingReducer,
    [getSuccessActionName(SET_COUNTRIES)]: pipe(
      successReducer,
      normalizer(prop('id', schema))
    ),
    [getErrorActionName(SET_COUNTRIES)]: errorReducer,
  },
  initialState
);
