import { pipe, prop } from 'ramda';

import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName, normalizer } from 'store/utils';

import schema from './schema';

import { FETCH_HOTELS, FETCH_HOTEL } from './actions';

export default createReducer(
  {
    [FETCH_HOTELS]: loadingReducer,
    [getSuccessActionName(FETCH_HOTELS)]: pipe(
      successReducer,
      normalizer(prop('id', schema))
    ),
    [getSuccessActionName(FETCH_HOTEL)]: pipe(
      successReducer,
      normalizer(prop('id', schema))
    ),
    [getErrorActionName(FETCH_HOTELS)]: errorReducer,
  },
  initialState
);
