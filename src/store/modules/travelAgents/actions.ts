import { ErrorResponse, ITravelAgent } from 'services/BackendApi/types';

export const TA_SEARCH_SUCCESS = 'travelAgents/TA_SEARCH_SUCCESS';
export const TA_SEARCH_FAILURE = 'travelAgents/TA_SEARCH_FAILURE';
export const TA_REQUEST = 'travelAgents/TA_REQUEST';
export const TA_SUCCESS = 'travelAgents/TA_SUCCESS';
export const TA_FAILURE = 'travelAgents/TA_FAILURE';
export const SELECTED_TA_CHANGE = 'travelAgents/SELECTED_TA_CHANGE';
export const SHOW_TA_DROPDOWN = 'travelAgents/SHOW_TA_DROPDOWN';
export const SEARCH_TA_BY_NAME_CHANGE = 'travelAgents/SEARCH_TA_BY_NAME_CHANGE';

export type TaRequestAction = ReturnType<typeof taRequestAction>;
export const taRequestAction = () => ({
  type: TA_REQUEST as typeof TA_REQUEST,
});

export type TaSuccessAction = ReturnType<typeof taSuccessAction>;
export const taSuccessAction = (successResponse: ITravelAgent[]) => ({
  type: TA_SUCCESS as typeof TA_SUCCESS,
  successResponse,
});

export type TaFailureAction = ReturnType<typeof taFailureAction>;
export const taFailureAction = (errorResponse: ErrorResponse) => ({
  type: TA_FAILURE as typeof TA_FAILURE,
  errorResponse,
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


export type TaSearchSuccessAction = ReturnType<typeof taSearchSuccessAction>;
export const taSearchSuccessAction = (successResponse: ITravelAgent[]) => ({
  type: TA_SEARCH_SUCCESS as typeof TA_SEARCH_SUCCESS,
  successResponse,
});

export type TaSearchFailureAction = ReturnType<typeof taSearchFailureAction>;
export const taSearchFailureAction = (errorResponse: ErrorResponse) => ({
  type: TA_SEARCH_FAILURE as typeof TA_SEARCH_FAILURE,
  errorResponse,
});

export type TravelAgentsAction =
  | SelectedTaChangeAction
  | TaSearchSuccessAction
  | TaSearchFailureAction
  | TaRequestAction
  | TaSuccessAction
  | TaFailureAction
  | ShowTaDropdownAction
  | SearchTaByNameChangeAction;
