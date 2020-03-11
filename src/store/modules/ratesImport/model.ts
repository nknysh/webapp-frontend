import { IRatesImportData } from 'services/BackendApi';

export interface IRatesImportModel {
  importRatesRequestIsPending: boolean;
  error: any | null;
  status: IRatesImportData | null;
}

export const initialState: IRatesImportModel = {
  importRatesRequestIsPending: false,
  error: null,
  status: null
};
