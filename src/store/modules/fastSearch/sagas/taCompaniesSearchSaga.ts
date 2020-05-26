import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  TA_COMPANIES_REQUEST,
  taCompaniesSuccessAction,
  taCompaniesFailureAction,
} from '../actions';
import {makeBackendApi, SearchOptionsResponse} from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';

export function* taCompanySearchSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);

    const result: AxiosResponse<SearchOptionsResponse> = yield call(backendApi.getCompanies);
    yield put(taCompaniesSuccessAction(result.data.data));
  } catch (e) {
    yield put(taCompaniesFailureAction(e));
  }
}

export function* watchTaCompanyChange() {
  yield takeLatest(TA_COMPANIES_REQUEST, taCompanySearchSaga);
}
