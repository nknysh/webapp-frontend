import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put, delay, race, take, all } from 'redux-saga/effects';
import { pathOr } from 'ramda';

import {
  makeBackendApi,
  IRatesImportResponse,
  EGenericStatusValue
} from 'services/BackendApi';

import { getUserCountryContext } from 'store/modules/auth';

import {
  RATES_IMPORT_PAGE_LOADED,
  RATES_IMPORT_PAGE_UNLOADED,
  CONFIRM_RATES_IMPORT_INTENT,

  getRatesImportStatusSuccessAction,
  getRatesImportStatusFailureAction,

  importRatesSuccessAction,
  importRatesFailureAction,
} from './actions';

import { latestStatusSelector } from './selectors';

const GET_RATES_IMPORT_STATUS_POLL_INTERVAL = 10 * 1000;

const getErrorMessage = (err: any) => {
  const errors: Array<{ title?: string, detail?: string }> = pathOr([], ['response', 'data', 'errors'], err);
  return errors
    .map(item => [item.title, item.detail].filter(Boolean).join(': '))
    .join('\n');
};

function* importRatesRequestSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IRatesImportResponse> = yield call(backendApi.importRates);
    
    yield put(importRatesSuccessAction(result.data.data));
  } catch (e) {
    yield put(importRatesFailureAction(getErrorMessage(e)));
  }
}

function* getRatesImportStatusRequestSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IRatesImportResponse> = yield call(backendApi.getRatesImportStatus);
    
    yield put(getRatesImportStatusSuccessAction(result.data.data));
  } catch (e) {
    yield put(getRatesImportStatusFailureAction(getErrorMessage(e)));
  }
}

function* pollRatesImportStatusSaga() {
  while(true){
    const latestStatus = yield select(latestStatusSelector);

    if(latestStatus && latestStatus.status !== EGenericStatusValue.DONE) {
      yield getRatesImportStatusRequestSaga();
    }

    yield delay(GET_RATES_IMPORT_STATUS_POLL_INTERVAL);
  }
}

function* ratesImportPageLoadedSaga() {
  yield getRatesImportStatusRequestSaga();
  yield race([
    take(RATES_IMPORT_PAGE_UNLOADED),
    call(pollRatesImportStatusSaga)
  ]);
}

export default function*() {
  yield all([
    takeLatest(RATES_IMPORT_PAGE_LOADED, ratesImportPageLoadedSaga),    
    takeLatest(CONFIRM_RATES_IMPORT_INTENT, importRatesRequestSaga)
  ]);
}
