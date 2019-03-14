import { pipe, prop } from 'ramda';

import { createReducer, getErrorActionName, getSuccessActionName, normalizer } from 'store/utils';
import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';

import schema from './schema';

import { FETCH_LATEST_OFFERS } from './actions';

export default createReducer(
  {
    [FETCH_LATEST_OFFERS]: loadingReducer,
    [getSuccessActionName(FETCH_LATEST_OFFERS)]: pipe(
      successReducer,
      normalizer(prop('id', schema))
    ),
    [getErrorActionName(FETCH_LATEST_OFFERS)]: errorReducer,
  },
  initialState
);
