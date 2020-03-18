import {
  importRatesRequestAction,
  importRatesSuccessAction,
  importRatesFailureAction,
  getRatesImportStatusSuccessAction,
  getRatesImportStatusFailureAction,
  openRatesImportConfirmationModal,
  confirmRatesImportIntent,
  cancelRatesImportIntent
} from '../actions';

import { initialState } from '../model';
import { ratesImport as reducer, uiStateReducer } from '../reducer';
import { ratesImportStatus as mockRatesImportStatus } from './mock';

describe('Rates Import reducer', () => {

  it('handles IMPORT_RATES_REQUEST correctly', () => {
    const action = importRatesRequestAction();
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      importRatesRequestIsPending: true
    };

    expect(result).toEqual(expected);
  });

  it('handles IMPORT_RATES_SUCCESS correctly', () => {
    const action = importRatesSuccessAction(mockRatesImportStatus);
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      importRatesRequestIsPending: false,
      latestStatus: mockRatesImportStatus
    };

    expect(result).toEqual(expected);
  });

  it('handles IMPORT_RATES_FAILURE correctly', () => {
    const error = 'Failed to import rates';
    const action = importRatesFailureAction(error);
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      importRatesRequestIsPending: false,
      error
    };

    expect(result).toEqual(expected);
  });

  it('handles GET_RATES_IMPORT_STATUS_SUCCESS correctly', () => {
    const action = getRatesImportStatusSuccessAction(mockRatesImportStatus);
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      latestStatus: mockRatesImportStatus
    };

    expect(result).toEqual(expected);
  });

  it('handles GET_RATES_IMPORT_STATUS_FAILURE correctly', () => {
    const error = 'Failed to get import rates status';
    const action = getRatesImportStatusFailureAction(error);
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      error
    };

    expect(result).toEqual(expected);
  });

  describe('UI state reducer', () => {

    it('handles OPEN_RATES_IMPORT_CONFIRMATION_MODAL correctly', () => {
      const action = openRatesImportConfirmationModal();
      const result = uiStateReducer(initialState.uiState, action);
      
      const expected = {
        ...initialState.uiState,
        confirmationModalOpen: true
      };
  
      expect(result).toEqual(expected);
    });

    it('handles CONFIRM_RATES_IMPORT_INTENT correctly', () => {
      const action = confirmRatesImportIntent();
      const result = uiStateReducer(initialState.uiState, action);
      
      const expected = {
        ...initialState.uiState,
        confirmationModalOpen: false
      };
  
      expect(result).toEqual(expected);
    });

    it('handles CANCEL_RATES_IMPORT_INTENT correctly', () => {
      const action = cancelRatesImportIntent();
      const result = uiStateReducer(initialState.uiState, action);
      
      const expected = {
        ...initialState.uiState,
        confirmationModalOpen: false
      };
  
      expect(result).toEqual(expected);
    });

  });

});