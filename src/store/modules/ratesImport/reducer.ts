import { IRatesImportModel, initialState } from './model';
import {
  RatesImportAction,
  
  IMPORT_RATES_REQUEST,
  IMPORT_RATES_SUCCESS,
  IMPORT_RATES_FAILURE,
  
  GET_RATES_IMPORT_STATUS_SUCCESS,
  GET_RATES_IMPORT_STATUS_FAILURE,

} from './actions';

import { EGenericStatusValue } from 'services/BackendApi';

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

    default:
      return state;
  }
};
