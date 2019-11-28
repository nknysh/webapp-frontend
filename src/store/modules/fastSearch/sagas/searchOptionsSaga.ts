import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import { OPTIONS_REQUEST, optionsFailureAction, optionsSuccessAction } from '../actions';
import { makeBackendApi, SearchOptionsResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';

export function* optionsRequestSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<SearchOptionsResponse> = yield call(backendApi.getSearchOptions);
    yield put(optionsSuccessAction(result.data.data));
  } catch (e) {
    yield put(optionsFailureAction(e));
  }
}

export function* watchOptionsRequest() {
  yield takeLatest(OPTIONS_REQUEST, optionsRequestSaga);
}
