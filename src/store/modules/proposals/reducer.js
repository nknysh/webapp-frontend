import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import {
  PROPOSAL_AMEND_BOOKING,
  PROPOSAL_BOOKING_REQUEST,
  PROPOSAL_FETCH,
  PROPOSAL_UPDATE,
  PROPOSAL_COMPLETE,
  PROPOSALS_ADD,
  PROPOSALS_FETCH,
  PROPOSALS_NEW,
  PROPOSAL_GENERATE_PDF
} from './actions';

const generatePdfSuccess = (state,  { payload }) => {
  return {
    ...state,
    proposalPdf: payload.url
  };
};

const generatePdfRequest = state => {
  return {
    ...state,
    proposalPdf: null
  };
};


export default createReducer(
  {
    [getErrorActionName(PROPOSAL_AMEND_BOOKING)]: errorReducer,
    [getErrorActionName(PROPOSAL_BOOKING_REQUEST)]: errorReducer,
    [getErrorActionName(PROPOSAL_FETCH)]: errorReducer,
    [getErrorActionName(PROPOSAL_UPDATE)]: errorReducer,
    [getErrorActionName(PROPOSAL_COMPLETE)]: errorReducer,
    [getErrorActionName(PROPOSALS_ADD)]: errorReducer,
    [getErrorActionName(PROPOSALS_FETCH)]: errorReducer,
    [getErrorActionName(PROPOSALS_NEW)]: errorReducer,

    [getSuccessActionName(PROPOSAL_AMEND_BOOKING)]: successReducer,
    [getSuccessActionName(PROPOSAL_BOOKING_REQUEST)]: successReducer,
    [getSuccessActionName(PROPOSAL_FETCH)]: successReducer,
    [getSuccessActionName(PROPOSAL_UPDATE)]: successReducer,
    [getSuccessActionName(PROPOSAL_COMPLETE)]: successReducer,
    [getSuccessActionName(PROPOSALS_ADD)]: successReducer,
    [getSuccessActionName(PROPOSALS_FETCH)]: successReducer,
    [getSuccessActionName(PROPOSALS_NEW)]: successReducer,
    [getSuccessActionName(PROPOSAL_GENERATE_PDF)]: generatePdfSuccess,

    [PROPOSAL_AMEND_BOOKING]: loadingReducer,
    [PROPOSAL_BOOKING_REQUEST]: sendingReducer,
    [PROPOSAL_FETCH]: loadingReducer,
    [PROPOSAL_UPDATE]: sendingReducer,
    [PROPOSAL_COMPLETE]: sendingReducer,
    [PROPOSALS_ADD]: loadingReducer,
    [PROPOSALS_FETCH]: loadingReducer,
    [PROPOSALS_NEW]: loadingReducer,
    [PROPOSAL_GENERATE_PDF]: generatePdfRequest
  },
  initialState
);
