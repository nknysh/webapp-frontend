import * as Actions from './actions';
import { initialState, IAgentsModuleDomain } from './model';

export const agentsDomainReducer = (
  state: IAgentsModuleDomain = initialState,
  action: Actions.AgentsModuleAction
): IAgentsModuleDomain => {
  switch (action.type) {
    case Actions.GET_TRAVEL_AGENTS_REQUEST:
      return {
        ...state,
        requestPending: true,
      };

    case Actions.GET_TRAVEL_AGENTS_SUCCESS:
      return {
        ...state,
        requestPending: false,
        agents: action.agents,
      };

    case Actions.GET_TRAVEL_AGENTS_FAILURE:
      return {
        ...state,
        requestPending: true,
        agents: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};

export default agentsDomainReducer;
