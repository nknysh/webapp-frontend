import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import backendApi, { OffersSearchSuccessResponse } from 'services/BackendApi';
import qs from 'qs';
import { InitializeQueryAction, INITIALIZE_QUERY } from '../actions';
import { offersSearchFailureAction, offersSearchSuccessAction, populateQueryAction } from '../actions';

export function* initializeQuerySaga(action: InitializeQueryAction) {
  try {
    const queryObj = yield qs.parse(action.queryString);
    const sanitizedQuery = yield call(backendApi.sanitizQueryObject, queryObj);
    const result: AxiosResponse<OffersSearchSuccessResponse> = yield call(backendApi.getOffersSearch, sanitizedQuery);
    yield put(offersSearchSuccessAction(result.data));
    yield put(populateQueryAction(sanitizedQuery));
  } catch (e) {
    yield put(offersSearchFailureAction(e));
  }
}

export function* watchInitializeQuery() {
  yield takeLatest(INITIALIZE_QUERY, initializeQuerySaga);
}