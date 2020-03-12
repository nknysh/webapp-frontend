import { IRatesImportStatus } from 'services/BackendApi';

export interface IRatesImportModel {
  importRatesRequestIsPending: boolean;
  error: any | null;
  latestStatus: IRatesImportStatus | null;
}

export const initialState: IRatesImportModel = {
  importRatesRequestIsPending: false,
  error: null,
  latestStatus: null
};
