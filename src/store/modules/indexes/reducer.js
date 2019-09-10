import { initialState as baseInitialState, loadingReducer, errorReducer, Status } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

const initialState = {
  ...baseInitialState,
  indexes: {},
};

import { INDEXING } from './actions';

/**
 * Search index reducer
 *
 * @param {object} state
 * @param {object}
 */
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
  },
  initialState
);
