import * as Actions from './actions';
import { initialState, IAgentsModuleDomain } from './model';
import { getTaFullName } from 'store/utils';

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

    case Actions.SELECTED_TA_CHANGE:
      return {
        ...state,
        selectedTa: action.value,
        taNameSearch: getTaFullName(action.value),
      };

    case Actions.SHOW_TA_DROPDOWN:
      return {
        ...state,
        showTaDropdown: action.value,
      };

    case Actions.SEARCH_TA_BY_NAME_CHANGE:
      return {
        ...state,
        taNameSearch: action.value,
      };

    default:
      return state;
  }
};

export default agentsDomainReducer;
