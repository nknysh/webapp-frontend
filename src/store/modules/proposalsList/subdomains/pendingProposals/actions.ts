export const GET_PENDING_PROPOSALS_COUNT_REQUEST = 'proposalList/GET_PENDING_PROPOSALS_COUNT_REQUEST';
export const GET_PENDING_PROPOSALS_COUNT_SUCCESS = 'proposalList/GET_PENDING_PROPOSALS_COUNT_SUCCESS';
export const GET_PENDING_PROPOSALS_COUNT_FAILURE = 'proposalList/GET_PENDING_PROPOSALS_COUNT_FAILURE';


export type GetPendingProposalsCountRequestAction = ReturnType<typeof getPendingProposalsCountRequestAction>;
export const getPendingProposalsCountRequestAction = () => ({
  type: GET_PENDING_PROPOSALS_COUNT_REQUEST as typeof GET_PENDING_PROPOSALS_COUNT_REQUEST,
});

export type GetPendingProposalsCountSuccessAction = ReturnType<typeof getPendingProposalsCountSuccessAction>;
export const getPendingProposalsCountSuccessAction = (count: number) => ({
  type: GET_PENDING_PROPOSALS_COUNT_SUCCESS as typeof GET_PENDING_PROPOSALS_COUNT_SUCCESS,
  count
});

export type GetPendingProposalsCountFailureAction = ReturnType<typeof getPendingProposalsCountFailureAction>;
export const getPendingProposalsCountFailureAction = (error: any) => ({
  type: GET_PENDING_PROPOSALS_COUNT_FAILURE as typeof GET_PENDING_PROPOSALS_COUNT_FAILURE,
  error,
});

export type PendingProposalsAction =
  | GetPendingProposalsCountRequestAction
  | GetPendingProposalsCountSuccessAction
  | GetPendingProposalsCountFailureAction;
