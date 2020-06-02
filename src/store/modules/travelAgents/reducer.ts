import { initialState, ITravelAgentsDomain } from './model'
import * as Actions from './actions';
import { getTaFullName } from 'store/utils';

export default function taReducer(
  state: ITravelAgentsDomain = initialState,
  action: Actions.TravelAgentsAction){
  switch(action.type) {
    case Actions.SELECTED_TA_CHANGE:
      return {
        ...state,
        selectedTa: action.value,
        taNameSearch: getTaFullName(action.value),
      };

    case Actions.TA_SUCCESS:
      return {
        ...state,
        travelAgents: action.successResponse,
        isFetchingTA: false,
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
}
