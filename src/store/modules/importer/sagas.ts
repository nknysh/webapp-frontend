import { AxiosResponse, AxiosInstance } from 'axios';
import { call,  select, put, delay, take, race, takeLatest, all } from 'redux-saga/effects';
import { pathOr, curry } from 'ramda';

import {
  BackendApiService,
  makeBackendApi,
  IImportResponse,
  IImportStatus,
  ErrorResponse,
  EGenericStatusValue
} from 'services/BackendApi';

import { EImportEntity } from './model';

import { getUserCountryContext } from 'store/modules/auth';

import {  
  getImportStatusSuccessAction,
  getImportStatusFailureAction,

  importSuccessAction,
  importFailureAction,

  IMPORT_PAGE_UNLOADED,
  IMPORT_PAGE_LOADED,
  CONFIRM_IMPORT_INTENT
} from './actions';

import {
  latestStatusSelectorFactory,
  ImportDomainSelector
} from './selectors';

type ApiCall = (backendApi: BackendApiService<AxiosInstance>) => Promise<AxiosResponse<IImportResponse | ErrorResponse>>;

const GET_IMPORT_STATUS_POLL_INTERVAL = 10 * 1000;

const getErrorMessage = (err: any) => {
  const errors: Array<{ title?: string, detail?: string }> = pathOr([], ['response', 'data', 'errors'], err);
  return errors
    .map(item => [item.title, item.detail].filter(Boolean).join(': '))
    .join('\n');
};

const ofEntityAndType = curry(
  (entity: EImportEntity, type: string, action: any) => 
    action.entity === entity && action.type === type
);

export const importRequestSagaFactory = (
  entity: EImportEntity,
  apiCall: ApiCall
) => function*() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IImportResponse> = yield call(() => apiCall(backendApi));
    
    yield put(importSuccessAction(entity, result.data.data, result.data.meta.workbookId));
  } catch (e) {
    yield put(importFailureAction(entity, getErrorMessage(e)));
  }
}

export const getImportStatusRequestSagaFactory = (
  entity: EImportEntity,
  apiCall: ApiCall
) => function*() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IImportResponse> = yield call(() => apiCall(backendApi));
    
    yield put(getImportStatusSuccessAction(entity, result.data.data, result.data.meta.workbookId));
  } catch (e) {
    yield put(getImportStatusFailureAction(entity, getErrorMessage(e)));
  }
}


export const pollImportStatusSagaFactory = (
  latestStatusSelector: (state: any) => IImportStatus | null,
  getImportStatusRequestSaga: any
) => function* () {
  while(true){
    const latestStatus = yield select(latestStatusSelector);

    if(latestStatus && latestStatus.status !== EGenericStatusValue.DONE) {
      yield getImportStatusRequestSaga();
    }

    yield delay(GET_IMPORT_STATUS_POLL_INTERVAL);
  }
}

export const rootSagaFactory = (
  ops: {
    entity: EImportEntity,
    domainSelector: ImportDomainSelector,
    importApiCall: ApiCall,
    importStatusApiCall: ApiCall,
  }
) => function*() {

  const importRequestSaga = importRequestSagaFactory(
    ops.entity,
    ops.importApiCall
  );
  
  const getImportStatusRequestSaga = getImportStatusRequestSagaFactory(
    ops.entity,
    ops.importStatusApiCall
  );
  
  const pollImportStatusSaga = pollImportStatusSagaFactory(
    latestStatusSelectorFactory(ops.domainSelector),
    getImportStatusRequestSaga
  );

  const ofType = ofEntityAndType(ops.entity);
  
  const importPageLoadedSaga = function*() {
    yield getImportStatusRequestSaga();
    yield race([
      take(ofType(IMPORT_PAGE_UNLOADED)),
      call(pollImportStatusSaga)
    ]);
  }

  yield all([
    takeLatest(ofType(IMPORT_PAGE_LOADED), importPageLoadedSaga),    
    takeLatest(ofType(CONFIRM_IMPORT_INTENT), importRequestSaga)
  ]);
};
