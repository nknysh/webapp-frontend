import { IImportModel, initialState, IImportUiState, EImportEntity } from './model';
import {
  ImportAction,
  
  IMPORT_REQUEST,
  IMPORT_SUCCESS,
  IMPORT_FAILURE,
  
  GET_IMPORT_STATUS_SUCCESS,
  GET_IMPORT_STATUS_FAILURE,

  OPEN_IMPORT_CONFIRMATION_MODAL,
  CONFIRM_IMPORT_INTENT,
  CANCEL_IMPORT_INTENT,
} from './actions';


export const uiStateReducer = (state: IImportUiState = initialState.uiState, action: ImportAction): IImportUiState => {
  switch (action.type) {
    case OPEN_IMPORT_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmationModalOpen: true
      };
    
    case CONFIRM_IMPORT_INTENT:
      return {
        ...state,
        confirmationModalOpen: false
      };
    
    case CANCEL_IMPORT_INTENT:
      return {
        ...state,
        confirmationModalOpen: false
      };

    default:
      return state;
  }
};


export const importReducer = (entity: EImportEntity) => (state: IImportModel = initialState, action: ImportAction): IImportModel => {
  if(action.entity !== entity){
    return state;
  }

  switch (action.type) {
    
    //------------------- import action -------------------------------

    case IMPORT_REQUEST:
      return {
        ...state,
        importRequestIsPending: true,
        error: null,
      };

    case IMPORT_SUCCESS:
      return {
        ...state,
        importRequestIsPending: false,
        error: null,
        latestStatus: action.status,
        workbookId: action.workbookId
      };

    case IMPORT_FAILURE:
      return {
        ...state,
        importRequestIsPending: false,
        error: action.error,
      };
    
    //------------------- get import status action -------------------------------

    case GET_IMPORT_STATUS_SUCCESS:
      return {
        ...state,
        error: null,
        latestStatus: action.status,
        workbookId: action.workbookId
      };

    case GET_IMPORT_STATUS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    
    //------------------- UI actions -------------------------------

    case OPEN_IMPORT_CONFIRMATION_MODAL:
    case CONFIRM_IMPORT_INTENT:
    case CANCEL_IMPORT_INTENT:
      return {
        ...state,
        uiState: uiStateReducer(state.uiState, action)
      };

    default:
      return state;
  }
};
