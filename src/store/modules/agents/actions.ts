import { ITravelAgent } from 'services/BackendApi';
export const GET_TRAVEL_AGENTS_REQUEST = 'agentsModule/GET_TRAVEL_AGENTS_REQUEST';
export const GET_TRAVEL_AGENTS_SUCCESS = 'agentsModule/GET_TRAVEL_AGENTS_SUCCESS';
export const GET_TRAVEL_AGENTS_FAILURE = 'agentsModule/GET_TRAVEL_AGENTS_FAILURE';
export const SELECTED_TA_CHANGE = 'agentsModule/SELECTED_TA_CHANGE';
export const SHOW_TA_DROPDOWN = 'agentsModule/SHOW_TA_DROPDOWN';
export const SEARCH_TA_BY_NAME_CHANGE = 'agentsModule/SEARCH_TA_BY_NAME_CHANGE';

export type GetTravelAgentRequestAction = ReturnType<typeof getTravelAgentsRequestAction>;
export const getTravelAgentsRequestAction = (forceLoad?: boolean) => ({
  type: GET_TRAVEL_AGENTS_REQUEST as typeof GET_TRAVEL_AGENTS_REQUEST,
  forceLoad,
});

export type GetTravelAgentSuccessAction = ReturnType<typeof getTravelAgentsSuccessAction>;
export const getTravelAgentsSuccessAction = (agents: ITravelAgent[]) => ({
  type: GET_TRAVEL_AGENTS_SUCCESS as typeof GET_TRAVEL_AGENTS_SUCCESS,
  agents,
});

export type GetTravelAgentFailureAction = ReturnType<typeof getTravelAgentsFailureAction>;
export const getTravelAgentsFailureAction = (error: string) => ({
  type: GET_TRAVEL_AGENTS_FAILURE as typeof GET_TRAVEL_AGENTS_FAILURE,
  error,
});

export type SelectedTaChangeAction = ReturnType<typeof selectedTaChangeAction>;
export const selectedTaChangeAction = (value: ITravelAgent | null) => ({
  type: SELECTED_TA_CHANGE as typeof SELECTED_TA_CHANGE,
  value,
});

export type ShowTaDropdownAction = ReturnType<typeof showTaDropdownAction>;
export const showTaDropdownAction = (value: boolean) => ({
  type: SHOW_TA_DROPDOWN as typeof SHOW_TA_DROPDOWN,
  value,
});

export type SearchTaByNameChangeAction = ReturnType<typeof searchTaByNameChangeAction>;
export const searchTaByNameChangeAction = (value: string) => ({
  type: SEARCH_TA_BY_NAME_CHANGE as typeof SEARCH_TA_BY_NAME_CHANGE,
  value,
});

export type AgentsModuleAction =
  | GetTravelAgentRequestAction
  | GetTravelAgentSuccessAction
  | GetTravelAgentFailureAction
  | SelectedTaChangeAction
  | ShowTaDropdownAction
  | SearchTaByNameChangeAction;
