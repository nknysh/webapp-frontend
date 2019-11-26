import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import { OPTIONS_REQUEST, optionsFailureAction, optionsSuccessAction } from '../actions';
import backendApi, { SearchOptionsResponse } from 'services/BackendApi';

export function* optionsRequestSaga() {
  try {
    const result: AxiosResponse<SearchOptionsResponse> = yield call(backendApi.getSearchOptions);
    yield put(optionsSuccessAction(result.data.data));
  } catch (e) {
    yield put(optionsFailureAction(e));
  }
}

export function* watchOptionsRequest() {
  yield takeLatest(OPTIONS_REQUEST, optionsRequestSaga);
}
