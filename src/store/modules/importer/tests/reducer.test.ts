import {
  importRequestAction,
  importSuccessAction,
  importFailureAction,
  getImportStatusSuccessAction,
  getImportStatusFailureAction,
  openImportConfirmationModal,
  confirmImportIntent,
  cancelImportIntent
} from '../actions';

import { initialState, EImportEntity } from '../model';
import { importReducer, uiStateReducer } from '../reducer';
import { importStatus as mockImportStatus } from './mock';

const mockWorkbookId = '123-456';

describe('Import reducer', () => {
  const entity = EImportEntity.RATES;
  const reducer = importReducer(entity);

  it('handles IMPORT_REQUEST correctly', () => {
    const action = importRequestAction(entity);
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      importRequestIsPending: true
    };

    expect(result).toEqual(expected);
  });

  it('handles IMPORT_SUCCESS correctly', () => {
    const action = importSuccessAction(entity, mockImportStatus, mockWorkbookId);
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      importRequestIsPending: false,
      latestStatus: mockImportStatus,
      workbookId: mockWorkbookId
    };

    expect(result).toEqual(expected);
  });

  it('handles IMPORT_FAILURE correctly', () => {
    const error = 'Failed to import ';
    const action = importFailureAction(entity, error);
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      importRequestIsPending: false,
      error
    };

    expect(result).toEqual(expected);
  });

  it('handles GET_IMPORT_STATUS_SUCCESS correctly', () => {
    const action = getImportStatusSuccessAction(entity, mockImportStatus, mockWorkbookId);
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      latestStatus: mockImportStatus,
      workbookId: mockWorkbookId
    };

    expect(result).toEqual(expected);
  });

  it('handles GET_IMPORT_STATUS_FAILURE correctly', () => {
    const error = 'Failed to get import  status';
    const action = getImportStatusFailureAction(entity, error);
    const result = reducer(initialState, action);
    
    const expected = {
      ...initialState,
      error
    };

    expect(result).toEqual(expected);
  });

  describe('UI state reducer', () => {

    it('handles OPEN_IMPORT_CONFIRMATION_MODAL correctly', () => {
      const action = openImportConfirmationModal(entity);
      const result = uiStateReducer(initialState.uiState, action);
      
      const expected = {
        ...initialState.uiState,
        confirmationModalOpen: true
      };
  
      expect(result).toEqual(expected);
    });

    it('handles CONFIRM_IMPORT_INTENT correctly', () => {
      const action = confirmImportIntent(entity);
      const result = uiStateReducer(initialState.uiState, action);
      
      const expected = {
        ...initialState.uiState,
        confirmationModalOpen: false
      };
  
      expect(result).toEqual(expected);
    });

    it('handles CANCEL_IMPORT_INTENT correctly', () => {
      const action = cancelImportIntent(entity);
      const result = uiStateReducer(initialState.uiState, action);
      
      const expected = {
        ...initialState.uiState,
        confirmationModalOpen: false
      };
  
      expect(result).toEqual(expected);
    });

  });

});