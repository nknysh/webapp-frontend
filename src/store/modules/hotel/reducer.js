import { mergeDeepRight, pick } from 'ramda';

import { initialState, loadingReducer, errorReducer, successResetReducer, Status } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { HOTEL, HOTEL_ROOMS } from './actions';

/**
 * Set id
 *
 * @param {object} state
 * @param {object}
 * @returns {object}
 */
export const setId = (state, { payload }) =>
  mergeDeepRight(state, {
    status: Status.SUCCESS,
    data: pick(['result'], payload),
  });

export default createReducer(
  {
    [HOTEL]: loadingReducer,
    [getSuccessActionName(HOTEL)]: setId,
    [getErrorActionName(HOTEL)]: errorReducer,
    [HOTEL_ROOMS]: loadingReducer,
    [getSuccessActionName(HOTEL_ROOMS)]: successResetReducer,
    [getErrorActionName(HOTEL_ROOMS)]: errorReducer,
  },
  initialState
);
