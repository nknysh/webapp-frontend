import { IRatesImportModel, initialState, IRatesImportUiState } from './model';
import {
  RatesImportAction,
  
  IMPORT_RATES_REQUEST,
  IMPORT_RATES_SUCCESS,
  IMPORT_RATES_FAILURE,
  
  GET_RATES_IMPORT_STATUS_SUCCESS,
  GET_RATES_IMPORT_STATUS_FAILURE,

  OPEN_RATES_IMPORT_CONFIRMATION_MODAL,
  CONFIRM_RATES_IMPORT_INTENT,
  CANCEL_RATES_IMPORT_INTENT,
} from './actions';


export const uiStateReducer = (state: IRatesImportUiState = initialState.uiState, action: RatesImportAction): IRatesImportUiState => {
  switch (action.type) {
    case OPEN_RATES_IMPORT_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmationModalOpen: true
      };
    
    case CONFIRM_RATES_IMPORT_INTENT:
      return {
        ...state,
        confirmationModalOpen: false
      };
    
    case CANCEL_RATES_IMPORT_INTENT:
      return {
        ...state,
        confirmationModalOpen: false
      };

    default:
      return state;
  }
};


export const ratesImport = (state: IRatesImportModel = initialState, action: RatesImportAction): IRatesImportModel => {
  switch (action.type) {
    
    //------------------- import rates action -------------------------------

    case IMPORT_RATES_REQUEST:
      return {
        ...state,
        importRatesRequestIsPending: true,
        error: null,
      };

    case IMPORT_RATES_SUCCESS:
      return {
        ...state,
        importRatesRequestIsPending: false,
        error: null,
        latestStatus: action.status,
      };

    case IMPORT_RATES_FAILURE:
      return {
        ...state,
        importRatesRequestIsPending: false,
        error: action.error,
      };
    
    //------------------- get rates import status action -------------------------------

    case GET_RATES_IMPORT_STATUS_SUCCESS:
      return {
        ...state,
        error: null,
        latestStatus: action.status,
      };

    case GET_RATES_IMPORT_STATUS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    
    //------------------- UI actions -------------------------------

    case OPEN_RATES_IMPORT_CONFIRMATION_MODAL:
    case CONFIRM_RATES_IMPORT_INTENT:
    case CANCEL_RATES_IMPORT_INTENT:
      return {
        ...state,
        uiState: uiStateReducer(state.uiState, action)
      };

    default:
      return state;
  }
};
