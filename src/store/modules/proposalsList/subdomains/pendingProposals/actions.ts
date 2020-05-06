import { IProposalBasicInfo } from 'services/BackendApi/types/ProposalsListResponse';

export const GET_PENDING_PROPOSALS_INFO_REQUEST = 'proposalList/GET_PENDING_PROPOSALS_INFO_REQUEST';
export const GET_PENDING_PROPOSALS_INFO_SUCCESS = 'proposalList/GET_PENDING_PROPOSALS_INFO_SUCCESS';
export const GET_PENDING_PROPOSALS_INFO_FAILURE = 'proposalList/GET_PENDING_PROPOSALS_INFO_FAILURE';


export type GetPendingProposalsInfoRequestAction = ReturnType<typeof getPendingProposalsInfoRequestAction>;
export const getPendingProposalsInfoRequestAction = () => ({
  type: GET_PENDING_PROPOSALS_INFO_REQUEST as typeof GET_PENDING_PROPOSALS_INFO_REQUEST,
});

export type GetPendingProposalsInfoSuccessAction = ReturnType<typeof getPendingProposalsInfoSuccessAction>;
export const getPendingProposalsInfoSuccessAction = (count: number, latest?: IProposalBasicInfo) => ({
  type: GET_PENDING_PROPOSALS_INFO_SUCCESS as typeof GET_PENDING_PROPOSALS_INFO_SUCCESS,
  count,
  latest
});

export type GetPendingProposalsInfoFailureAction = ReturnType<typeof getPendingProposalsInfoFailureAction>;
export const getPendingProposalsInfoFailureAction = (error: any) => ({
  type: GET_PENDING_PROPOSALS_INFO_FAILURE as typeof GET_PENDING_PROPOSALS_INFO_FAILURE,
  error,
});

export type PendingProposalsAction =
  | GetPendingProposalsInfoRequestAction
  | GetPendingProposalsInfoSuccessAction
  | GetPendingProposalsInfoFailureAction;
