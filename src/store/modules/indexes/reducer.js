import { initialState as baseInitialState, loadingReducer, errorReducer, Status, successReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

const initialState = {
  ...baseInitialState,
  indexes: {},
};

import { INDEXING, INDEX_SEARCH } from './actions';

const searchIndex = (state, { payload }) => {
  return {
    ...state,
    status: Status.SUCCESS,
    indexes: {
      ...state.indexes,
      ...payload,
    },
  };
};

export default createReducer(
  {
    [INDEXING]: loadingReducer,
    [getSuccessActionName(INDEXING)]: searchIndex,
    [getErrorActionName(INDEXING)]: errorReducer,
    [INDEX_SEARCH]: loadingReducer,
    [getSuccessActionName(INDEX_SEARCH)]: successReducer,
    [getErrorActionName(INDEX_SEARCH)]: errorReducer,
  },
  initialState
);