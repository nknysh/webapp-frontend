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


    case Actions.GET_COMPANIES_REQUEST:
      return {
        ...state,
        isFetchingCompanies: true,
      };

    case Actions.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        isFetchingCompanies: false,
        companies: action.companies,
      };

    case Actions.GET_COMPANIES_FAILURE:
      return {
        ...state,
        isFetchingCompanies: true,
        companies: null,
        error: action.error,
      };

    case Actions.SELECTED_COMPANY_CHANGE:
      return {
        ...state,
        selectedCompany: action.value,
        companyNameSearch: action.value!.name,
        selectedTa: null
      };

    case Actions.SHOW_COMPANY_DROPDOWN:
      return {
        ...state,
        showCompanyDropdown: action.value,
      };

    case Actions.SEARCH_COMPANY_BY_NAME:
      return {
        ...state,
        companyNameSearch: action.value,
      };

    default:
      return state;
  }
};

export default agentsDomainReducer;
