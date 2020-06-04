import { ICompany, ITravelAgent } from 'services/BackendApi';
export const GET_TRAVEL_AGENTS_REQUEST = 'agentsModule/GET_TRAVEL_AGENTS_REQUEST';
export const GET_TRAVEL_AGENTS_SUCCESS = 'agentsModule/GET_TRAVEL_AGENTS_SUCCESS';
export const GET_TRAVEL_AGENTS_FAILURE = 'agentsModule/GET_TRAVEL_AGENTS_FAILURE';
export const SELECTED_TA_CHANGE = 'agentsModule/SELECTED_TA_CHANGE';
export const SHOW_TA_DROPDOWN = 'agentsModule/SHOW_TA_DROPDOWN';
export const SEARCH_TA_BY_NAME_CHANGE = 'agentsModule/SEARCH_TA_BY_NAME_CHANGE';
export const GET_COMPANIES_REQUEST = 'agentsModule/GET_COMPANIES_REQUEST';
export const GET_COMPANIES_SUCCESS = 'agentsModule/GET_COMPANIES_SUCCESS';
export const GET_COMPANIES_FAILURE = 'agentsModule/GET_COMPANIES_FAILURE';
export const SELECTED_COMPANY_CHANGE = 'agentsModule/SELECTED_COMPANY_CHANGE';
export const SHOW_COMPANY_DROPDOWN = 'agentsModule/SHOW_COMPANY_DROPDOWN';
export const SEARCH_COMPANY_BY_NAME = 'agentsModule/SEARCH_COMPANY_BY_NAME';

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


export type GetCompaniesRequestAction = ReturnType<typeof getCompaniesRequestAction>;
export const getCompaniesRequestAction = () => ({
  type: GET_COMPANIES_REQUEST as typeof GET_COMPANIES_REQUEST,
});

export type GetCompaniesSuccessAction = ReturnType<typeof getCompaniesSuccessAction>;
export const getCompaniesSuccessAction = (companies: ICompany[]) => ({
  type: GET_COMPANIES_SUCCESS as typeof GET_COMPANIES_SUCCESS,
  companies,
});

export type GetCompaniesFailureAction = ReturnType<typeof getCompaniesFailureAction>;
export const getCompaniesFailureAction = (error: string) => ({
  type: GET_COMPANIES_FAILURE as typeof GET_COMPANIES_FAILURE,
  error,
});

export type SelectedCompanyChangeAction = ReturnType<typeof selectedCompanyChangeAction>;
export const selectedCompanyChangeAction = (value: ICompany) => ({
  type: SELECTED_COMPANY_CHANGE as typeof SELECTED_COMPANY_CHANGE,
  value,
});

export type ShowCompanyDropdownAction = ReturnType<typeof showCompanyDropdownAction>;
export const showCompanyDropdownAction = (value: boolean) => ({
  type: SHOW_COMPANY_DROPDOWN as typeof SHOW_COMPANY_DROPDOWN,
  value,
});

export type SearchCompanyByNameAction = ReturnType<typeof searchCompanyByNameAction>;
export const searchCompanyByNameAction = (value: string) => ({
  type: SEARCH_COMPANY_BY_NAME as typeof SEARCH_COMPANY_BY_NAME,
  value,
});

export type AgentsModuleAction =
  | GetTravelAgentRequestAction
  | GetTravelAgentSuccessAction
  | GetTravelAgentFailureAction
  | SelectedTaChangeAction
  | ShowTaDropdownAction
  | SearchTaByNameChangeAction
  | GetCompaniesRequestAction
  | GetCompaniesSuccessAction
  | GetCompaniesFailureAction
  | SelectedCompanyChangeAction
  | ShowCompanyDropdownAction
  | SearchCompanyByNameAction;
