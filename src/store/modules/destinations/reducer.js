import { pipe, prop } from 'ramda';

import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName, normalizer } from 'store/utils';

import schema from './schema';

import { FETCH_DESTINATIONS } from './actions';

export default createReducer(
  {
    [FETCH_DESTINATIONS]: loadingReducer,
    [getSuccessActionName(FETCH_DESTINATIONS)]: pipe(
      successReducer,
      normalizer(prop('id', schema))
    ),
    [getErrorActionName(FETCH_DESTINATIONS)]: errorReducer,
  },
  initialState
);
