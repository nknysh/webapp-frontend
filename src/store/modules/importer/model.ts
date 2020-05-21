import { IImportStatus } from 'services/BackendApi';

export enum EImportEntity {
  RATES = 'rates',
  ALLOTMENTS = 'allotments',
}

export interface IImportUiState {
  confirmationModalOpen: boolean
}

export interface IImportModel {
  uiState: IImportUiState,
  importRequestIsPending: boolean;
  error: any | null;
  latestStatus: IImportStatus | null;
  workbookId: string | null;
}

export const initialState: IImportModel = {
  uiState: {
    confirmationModalOpen: false
  },
  importRequestIsPending: false,
  error: null,
  latestStatus: null,
  workbookId: null
};

