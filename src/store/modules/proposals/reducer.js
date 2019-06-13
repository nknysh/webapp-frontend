import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import {
  PROPOSALS_NEW,
  PROPOSALS_FETCH,
  PROPOSAL_FETCH,
  PROPOSALS_ADD,
  PROPOSAL_UPDATE,
  PROPOSAL_AMEND_BOOKING,
} from './actions';

export default createReducer(
  {
    [PROPOSALS_NEW]: loadingReducer,
    [getSuccessActionName(PROPOSALS_NEW)]: successReducer,
    [getErrorActionName(PROPOSALS_NEW)]: errorReducer,
    [PROPOSALS_ADD]: loadingReducer,
    [getSuccessActionName(PROPOSALS_ADD)]: successReducer,
    [getErrorActionName(PROPOSALS_ADD)]: errorReducer,
    [PROPOSAL_UPDATE]: sendingReducer,
    [getSuccessActionName(PROPOSAL_UPDATE)]: successReducer,
    [getErrorActionName(PROPOSAL_UPDATE)]: errorReducer,
    [PROPOSALS_FETCH]: loadingReducer,
    [getSuccessActionName(PROPOSALS_FETCH)]: successReducer,
    [getErrorActionName(PROPOSALS_FETCH)]: errorReducer,
    [PROPOSAL_FETCH]: loadingReducer,
    [getSuccessActionName(PROPOSAL_FETCH)]: successReducer,
    [getErrorActionName(PROPOSAL_FETCH)]: errorReducer,
    [PROPOSAL_AMEND_BOOKING]: loadingReducer,
    [getSuccessActionName(PROPOSAL_AMEND_BOOKING)]: successReducer,
    [getErrorActionName(PROPOSAL_AMEND_BOOKING)]: errorReducer,
  },
  initialState
);
