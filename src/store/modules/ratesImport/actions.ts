import { IRatesImportStatus } from 'services/BackendApi';

//------------------- import rates action -------------------------------

export const IMPORT_RATES_REQUEST = 'ratesImport/IMPORT_RATES_REQUEST';
export const IMPORT_RATES_SUCCESS = 'ratesImport/IMPORT_RATES_SUCCESS';
export const IMPORT_RATES_FAILURE = 'ratesImport/IMPORT_RATES_FAILURE';

export type ImportRatesRequestAction = ReturnType<typeof importRatesRequestAction>;
export const importRatesRequestAction = () => ({
  type: IMPORT_RATES_REQUEST as typeof IMPORT_RATES_REQUEST
});

export type ImportRatesSuccessAction = ReturnType<typeof importRatesSuccessAction>;
export const importRatesSuccessAction = (status: IRatesImportStatus) => ({
  type: IMPORT_RATES_SUCCESS as typeof IMPORT_RATES_SUCCESS,
  status,
});

export type ImportRatesFailureAction = ReturnType<typeof importRatesFailureAction>;
export const importRatesFailureAction = (error: any) => ({
  type: IMPORT_RATES_FAILURE as typeof IMPORT_RATES_FAILURE,
  error,
});

//------------------- get rates import status action -------------------------------

export const GET_RATES_IMPORT_STATUS_REQUEST = 'ratesImport/GET_RATES_IMPORT_STATUS_REQUEST';
export const GET_RATES_IMPORT_STATUS_SUCCESS = 'ratesImport/GET_RATES_IMPORT_STATUS_SUCCESS';
export const GET_RATES_IMPORT_STATUS_FAILURE = 'ratesImport/GET_RATES_IMPORT_STATUS_FAILURE';

export type GetRatesImportStatusRequestAction = ReturnType<typeof getRatesImportStatusRequestAction>;
export const getRatesImportStatusRequestAction = () => ({
  type: GET_RATES_IMPORT_STATUS_REQUEST as typeof GET_RATES_IMPORT_STATUS_REQUEST
});

export type GetRatesImportStatusSuccessAction = ReturnType<typeof getRatesImportStatusSuccessAction>;
export const getRatesImportStatusSuccessAction = (status: IRatesImportStatus) => ({
  type: GET_RATES_IMPORT_STATUS_SUCCESS as typeof GET_RATES_IMPORT_STATUS_SUCCESS,
  status,
});

export type GetRatesImportStatusFailureAction = ReturnType<typeof getRatesImportStatusFailureAction>;
export const getRatesImportStatusFailureAction = (error: any) => ({
  type: GET_RATES_IMPORT_STATUS_FAILURE as typeof GET_RATES_IMPORT_STATUS_FAILURE,
  error,
});

//-------------------------- page actions ------------------------------------------

export const RATES_IMPORT_PAGE_LOADED = 'ratesImport/RATES_IMPORT_PAGE_LOADED';
export const RATES_IMPORT_PAGE_UNLOADED = 'ratesImport/RATES_IMPORT_PAGE_UNLOADED';

export type RatesImportPageLoaded = ReturnType<typeof ratesImportPageLoaded>;
export const ratesImportPageLoaded = () => ({
  type: RATES_IMPORT_PAGE_LOADED as typeof RATES_IMPORT_PAGE_LOADED
});

export type RatesImportPageUnloaded = ReturnType<typeof ratesImportPageUnloaded>;
export const ratesImportPageUnloaded = () => ({
  type: RATES_IMPORT_PAGE_UNLOADED as typeof RATES_IMPORT_PAGE_UNLOADED
});

//-------------------------- ui action ------------------------------------------

export const OPEN_RATES_IMPORT_CONFIRMATION_MODAL = 'ratesImport/OPEN_RATES_IMPORT_CONFIRMATION_MODAL';
export const CONFIRM_RATES_IMPORT_INTENT = 'ratesImport/CONFIRM_RATES_IMPORT_INTENT';
export const CANCEL_RATES_IMPORT_INTENT = 'ratesImport/CANCEL_RATES_IMPORT_INTENT';

export type OpenRatesImportConfirmationModal = ReturnType<typeof openRatesImportConfirmationModal>;
export const openRatesImportConfirmationModal = () => ({
  type: OPEN_RATES_IMPORT_CONFIRMATION_MODAL as typeof OPEN_RATES_IMPORT_CONFIRMATION_MODAL
});

export type ConfirmRatesImportIntent = ReturnType<typeof confirmRatesImportIntent>;
export const confirmRatesImportIntent = () => ({
  type: CONFIRM_RATES_IMPORT_INTENT as typeof CONFIRM_RATES_IMPORT_INTENT
});

export type CancelRatesImportIntent = ReturnType<typeof cancelRatesImportIntent>;
export const cancelRatesImportIntent = () => ({
  type: CANCEL_RATES_IMPORT_INTENT as typeof CANCEL_RATES_IMPORT_INTENT
});

export type RatesImportAction =
  | ImportRatesRequestAction
  | ImportRatesSuccessAction
  | ImportRatesFailureAction
  | GetRatesImportStatusRequestAction
  | GetRatesImportStatusSuccessAction
  | GetRatesImportStatusFailureAction
  | RatesImportPageLoaded
  | RatesImportPageUnloaded
  | OpenRatesImportConfirmationModal
  | ConfirmRatesImportIntent
  | CancelRatesImportIntent;
