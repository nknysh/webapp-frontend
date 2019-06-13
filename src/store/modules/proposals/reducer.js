import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import {
  PROPOSAL_AMEND_BOOKING,
  PROPOSAL_BOOKING_REQUEST,
  PROPOSAL_FETCH,
  PROPOSAL_UPDATE,
  PROPOSALS_ADD,
  PROPOSALS_FETCH,
  PROPOSALS_NEW,
} from './actions';

export default createReducer(
  {
    [getErrorActionName(PROPOSAL_AMEND_BOOKING)]: errorReducer,
    [getErrorActionName(PROPOSAL_BOOKING_REQUEST)]: errorReducer,
    [getErrorActionName(PROPOSAL_FETCH)]: errorReducer,
    [getErrorActionName(PROPOSAL_UPDATE)]: errorReducer,
    [getErrorActionName(PROPOSALS_ADD)]: errorReducer,
    [getErrorActionName(PROPOSALS_FETCH)]: errorReducer,
    [getErrorActionName(PROPOSALS_NEW)]: errorReducer,

    [getSuccessActionName(PROPOSAL_AMEND_BOOKING)]: successReducer,
    [getSuccessActionName(PROPOSAL_BOOKING_REQUEST)]: successReducer,
    [getSuccessActionName(PROPOSAL_FETCH)]: successReducer,
    [getSuccessActionName(PROPOSAL_UPDATE)]: successReducer,
    [getSuccessActionName(PROPOSALS_ADD)]: successReducer,
    [getSuccessActionName(PROPOSALS_FETCH)]: successReducer,
    [getSuccessActionName(PROPOSALS_NEW)]: successReducer,

    [PROPOSAL_AMEND_BOOKING]: loadingReducer,
    [PROPOSAL_BOOKING_REQUEST]: sendingReducer,
    [PROPOSAL_FETCH]: loadingReducer,
    [PROPOSAL_UPDATE]: sendingReducer,
    [PROPOSALS_ADD]: loadingReducer,
    [PROPOSALS_FETCH]: loadingReducer,
    [PROPOSALS_NEW]: loadingReducer,
  },
  initialState
);
