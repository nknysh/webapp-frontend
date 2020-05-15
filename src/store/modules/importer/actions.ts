import { IImportStatus } from 'services/BackendApi';
import { EImportEntity } from './model';

//------------------- import action -------------------------------

export const IMPORT_REQUEST = 'import/IMPORT_REQUEST';
export const IMPORT_SUCCESS = 'import/IMPORT_SUCCESS';
export const IMPORT_FAILURE = 'import/IMPORT_FAILURE';

export type ImportRequestAction = ReturnType<typeof importRequestAction>;
export const importRequestAction = (entity: EImportEntity) => ({
  type: IMPORT_REQUEST as typeof IMPORT_REQUEST,
  entity
});

export type ImportSuccessAction = ReturnType<typeof importSuccessAction>;
export const importSuccessAction = (entity: EImportEntity, status: IImportStatus, workbookId: string) => ({
  type: IMPORT_SUCCESS as typeof IMPORT_SUCCESS,
  entity,
  status,
  workbookId
});

export type ImportFailureAction = ReturnType<typeof importFailureAction>;
export const importFailureAction = (entity: EImportEntity, error: any) => ({
  type: IMPORT_FAILURE as typeof IMPORT_FAILURE,
  entity,
  error,
});

//------------------- get import status action -------------------------------

export const GET_IMPORT_STATUS_REQUEST = 'import/GET_IMPORT_STATUS_REQUEST';
export const GET_IMPORT_STATUS_SUCCESS = 'import/GET_IMPORT_STATUS_SUCCESS';
export const GET_IMPORT_STATUS_FAILURE = 'import/GET_IMPORT_STATUS_FAILURE';

export type GetImportStatusRequestAction = ReturnType<typeof getImportStatusRequestAction>;
export const getImportStatusRequestAction = (entity: EImportEntity) => ({
  type: GET_IMPORT_STATUS_REQUEST as typeof GET_IMPORT_STATUS_REQUEST,
  entity
});

export type GetImportStatusSuccessAction = ReturnType<typeof getImportStatusSuccessAction>;
export const getImportStatusSuccessAction = (entity: EImportEntity, status: IImportStatus, workbookId: string) => ({
  type: GET_IMPORT_STATUS_SUCCESS as typeof GET_IMPORT_STATUS_SUCCESS,
  entity,
  status,
  workbookId
});

export type GetImportStatusFailureAction = ReturnType<typeof getImportStatusFailureAction>;
export const getRatesImportStatusFailureAction = (entity: EImportEntity, error: any) => ({
  type: GET_IMPORT_STATUS_FAILURE as typeof GET_IMPORT_STATUS_FAILURE,
  entity,
  error,
});

//-------------------------- page actions ------------------------------------------

export const IMPORT_PAGE_LOADED = 'import/IMPORT_PAGE_LOADED';
export const IMPORT_PAGE_UNLOADED = 'import/IMPORT_PAGE_UNLOADED';

export type ImportPageLoaded = ReturnType<typeof importPageLoaded>;
export const importPageLoaded = (entity: EImportEntity) => ({
  type: IMPORT_PAGE_LOADED as typeof IMPORT_PAGE_LOADED,
  entity
});

export type ImportPageUnloaded = ReturnType<typeof importPageUnloaded>;
export const importPageUnloaded = (entity: EImportEntity) => ({
  type: IMPORT_PAGE_UNLOADED as typeof IMPORT_PAGE_UNLOADED,
  entity
});

//-------------------------- ui action ------------------------------------------

export const OPEN_IMPORT_CONFIRMATION_MODAL = 'import/OPEN_IMPORT_CONFIRMATION_MODAL';
export const CONFIRM_IMPORT_INTENT = 'import/CONFIRM_IMPORT_INTENT';
export const CANCEL_IMPORT_INTENT = 'import/CANCEL_IMPORT_INTENT';

export type OpenImportConfirmationModal = ReturnType<typeof openImportConfirmationModal>;
export const openImportConfirmationModal = (entity: EImportEntity) => ({
  type: OPEN_IMPORT_CONFIRMATION_MODAL as typeof OPEN_IMPORT_CONFIRMATION_MODAL,
  entity
});

export type ConfirmImportIntent = ReturnType<typeof confirmImportIntent>;
export const confirmImportIntent = (entity: EImportEntity) => ({
  type: CONFIRM_IMPORT_INTENT as typeof CONFIRM_IMPORT_INTENT,
  entity
});

export type CancelImportIntent = ReturnType<typeof cancelImportIntent>;
export const cancelImportIntent = (entity: EImportEntity) => ({
  type: CANCEL_IMPORT_INTENT as typeof CANCEL_IMPORT_INTENT,
  entity
});

export type ImportAction =
  | ImportRequestAction
  | ImportSuccessAction
  | ImportFailureAction
  | GetImportStatusRequestAction
  | GetImportStatusSuccessAction
  | GetImportStatusFailureAction
  | ImportPageLoaded
  | ImportPageUnloaded
  | OpenImportConfirmationModal
  | ConfirmImportIntent
  | CancelImportIntent;
