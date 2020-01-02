import { ITravelAgent } from 'services/BackendApi';
export const GET_TRAVEL_AGENTS_REQUEST = 'agentsModule/GET_TRAVEL_AGENTS_REQUEST';
export const GET_TRAVEL_AGENTS_SUCCESS = 'agentsModule/GET_TRAVEL_AGENTS_SUCCESS';
export const GET_TRAVEL_AGENTS_FAILURE = 'agentsModule/GET_TRAVEL_AGENTS_FAILURE';

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

export type AgentsModuleAction =
  | GetTravelAgentRequestAction
  | GetTravelAgentSuccessAction
  | GetTravelAgentFailureAction;
