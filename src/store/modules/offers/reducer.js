import { pipe } from 'ramda';

import { createReducer, getErrorActionName, getSuccessActionName, normalizer } from 'store/utils';
import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';

import { FETCH_OFFERS } from './actions';

export default createReducer(
  {
    [FETCH_OFFERS]: loadingReducer,
    [getSuccessActionName(FETCH_OFFERS)]: pipe(
      successReducer,
      normalizer('uuid')
    ),
    [getErrorActionName(FETCH_OFFERS)]: errorReducer,
  },
  initialState
);
