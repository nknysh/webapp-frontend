import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put, delay, race, take } from 'redux-saga/effects';

import { getUserCountryContext } from 'store/modules/auth';

import {
  RATES_IMPORT_PAGE_LOADED,
  RATES_IMPORT_PAGE_UNLOADED,
  RatesImportPageLoaded,

  getRatesImportStatusSuccessAction,
  getRatesImportStatusFailureAction,
} from './actions';

import { makeBackendApi, IRatesImportResponse } from 'services/BackendApi';

const GET_RATES_IMPORT_STATUS_POLL_INTERVAL = 10 * 1000;

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
    //TODO check if latestStatus in progress
    yield getRatesImportStatusRequestSaga();
    yield delay(GET_RATES_IMPORT_STATUS_POLL_INTERVAL);
  }
}

function* ratesImportPageLoadedSaga(action: RatesImportPageLoaded) {
  yield race([
    take(RATES_IMPORT_PAGE_UNLOADED),
    call(pollRatesImportStatusSaga)
  ]);
}

export function* watchRatesImportPageLoaded() {
  yield takeLatest(RATES_IMPORT_PAGE_LOADED, ratesImportPageLoadedSaga);
}
