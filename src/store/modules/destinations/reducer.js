import { pipe } from 'ramda';

import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName, normalizer } from 'store/utils';

import { FETCH_DESTINATIONS } from './actions';

export default createReducer(
  {
    [FETCH_DESTINATIONS]: loadingReducer,
    [getSuccessActionName(FETCH_DESTINATIONS)]: pipe(
      successReducer,
      normalizer('id')
    ),
    [getErrorActionName(FETCH_DESTINATIONS)]: errorReducer,
  },
  initialState
);
