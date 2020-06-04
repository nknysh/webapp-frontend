import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { makeBackendApi, ICompaniesResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import {
  getCompaniesSuccessAction,
  getCompaniesFailureAction,
  GET_COMPANIES_REQUEST
} from '../actions';
import { companiesSelector } from '../selectors';

export function* getCompaniesRequestSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const existingCompanies = yield select(companiesSelector);
    if (!existingCompanies) {
      const result: AxiosResponse<ICompaniesResponse> = yield call(backendApi.getCompanies);
      yield put(getCompaniesSuccessAction(result.data.data));
    }
  } catch (e) {
    yield put(getCompaniesFailureAction(e.message));
  }
}

export function* watchGetCompaniesRequest() {
  yield takeLatest([GET_COMPANIES_REQUEST], getCompaniesRequestSaga);
}
