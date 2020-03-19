import { IRatesImportStatus } from 'services/BackendApi';

export interface IRatesImportUiState {
  confirmationModalOpen: boolean
}

export interface IRatesImportModel {
  uiState: IRatesImportUiState,
  importRatesRequestIsPending: boolean;
  error: any | null;
  latestStatus: IRatesImportStatus | null;
}

export const initialState: IRatesImportModel = {
  uiState: {
    confirmationModalOpen: false
  },
  importRatesRequestIsPending: false,
  error: null,
  latestStatus: null
};
