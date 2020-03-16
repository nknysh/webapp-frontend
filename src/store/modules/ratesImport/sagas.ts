import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put, delay, race, take } from 'redux-saga/effects';

import {
  makeBackendApi,
  IRatesImportResponse,
  EGenericStatusValue
} from 'services/BackendApi';

import { getUserCountryContext } from 'store/modules/auth';

import {
  RATES_IMPORT_PAGE_LOADED,
  RATES_IMPORT_PAGE_UNLOADED,

  getRatesImportStatusSuccessAction,
  getRatesImportStatusFailureAction,

  IMPORT_RATES_REQUEST,
  importRatesSuccessAction,
  importRatesFailureAction,
} from './actions';

import { latestStatusSelector } from './selectors';

const GET_RATES_IMPORT_STATUS_POLL_INTERVAL = 10 * 1000;

function* importRatesRequestSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IRatesImportResponse> = yield call(backendApi.importRates);
    
    yield put(importRatesSuccessAction(result.data.data));
  } catch (e) {
    yield put(importRatesFailureAction(e));
  }
}

function* getRatesImportStatusRequestSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IRatesImportResponse> = yield call(backendApi.getRatesImportStatus);
    
    yield put(getRatesImportStatusSuccessAction(result.data.data));
  } catch (e) {
    yield put(getRatesImportStatusFailureAction(e));
  }
}

function* pollRatesImportStatusSaga() {
  while(true){
    const latestStatus = yield select(latestStatusSelector);

    if(latestStatus && latestStatus.status === EGenericStatusValue.IN_PROGRESS) {
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

export function* watchRatesImportPageLoaded() {
  yield takeLatest(RATES_IMPORT_PAGE_LOADED, ratesImportPageLoadedSaga);
}

export function* watchImportRatesRequest() {
  yield takeLatest(IMPORT_RATES_REQUEST, importRatesRequestSaga);
}
