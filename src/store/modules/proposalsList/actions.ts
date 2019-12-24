import { IProposalsListItem } from 'services/BackendApi';

export const GET_PROPOSAL_LIST_REQUEST = 'proposalList/GET_PROPOSAL_LIST_REQUEST';
export const GET_PROPOSAL_LIST_SUCCESS = 'proposalList/GET_PROPOSAL_LIST_SUCCESS';
export const GET_PROPOSAL_LIST_FAILURE = 'proposalList/GET_PROPOSAL_LIST_FAILURE';
export const SET_FILTER = 'proposalList/SET_FILTER';
export const SET_PAGE_NUMBER = 'proposalList/SET_PAGE_NUMBER';
export const SET_SORT = 'proposalList/SET_SORT';
export const SET_TRAVEL_AGENT_UUID = 'proposalList/SET_TRAVEL_AGENT_UUID';

export type GetProposalListRequestAction = ReturnType<typeof getProposalListRequestAction>;
export const getProposalListRequestAction = () => ({
  type: GET_PROPOSAL_LIST_REQUEST as typeof GET_PROPOSAL_LIST_REQUEST,
});

export type GetProposalListSuccessAction = ReturnType<typeof getProposalListSuccessAction>;
export const getProposalListSuccessAction = (proposals: IProposalsListItem[], totalResults: number) => ({
  type: GET_PROPOSAL_LIST_SUCCESS as typeof GET_PROPOSAL_LIST_SUCCESS,
  proposals,
  totalResults,
});

export type GetProposalListFailureAction = ReturnType<typeof getProposalListFailureAction>;
export const getProposalListFailureAction = (error: any) => ({
  type: GET_PROPOSAL_LIST_FAILURE as typeof GET_PROPOSAL_LIST_FAILURE,
  error,
});

export type SetFilterAction = ReturnType<typeof setFilterAction>;
export const setFilterAction = (filter: string) => ({
  type: SET_FILTER as typeof SET_FILTER,
  filter,
});

export type SetPageNumberAction = ReturnType<typeof setPageNumberAction>;
export const setPageNumberAction = (pageNumber: any) => ({
  type: SET_PAGE_NUMBER as typeof SET_PAGE_NUMBER,
  pageNumber,
});

export type SetSortAction = ReturnType<typeof setSortAction>;
export const setSortAction = (sortBy: keyof IProposalsListItem, sortOrder: 'asc' | 'desc') => ({
  type: SET_SORT as typeof SET_SORT,
  sortBy,
  sortOrder,
});

export type SetSelectedTravelAgentAction = ReturnType<typeof setSelectedTravelAgentAction>;
export const setSelectedTravelAgentAction = (travelAgentUuid: string) => ({
  type: SET_TRAVEL_AGENT_UUID as typeof SET_SORT,
  travelAgentUuid,
});

export type ProposalsListAction =
  | GetProposalListRequestAction
  | GetProposalListSuccessAction
  | GetProposalListFailureAction
  | SetFilterAction
  | SetPageNumberAction
  | SetSortAction
  | SetSelectedTravelAgentAction;
