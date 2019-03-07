import { pipe } from 'ramda';

import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName, normalizer } from 'store/utils';

import { FETCH_HOTELS } from './actions';

export default createReducer(
  {
    [FETCH_HOTELS]: loadingReducer,
    [getSuccessActionName(FETCH_HOTELS)]: pipe(
      successReducer,
      normalizer('uuid')
    ),
    [getErrorActionName(FETCH_HOTELS)]: errorReducer,
  },
  initialState
);
