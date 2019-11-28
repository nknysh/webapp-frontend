import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, OffersSearchSuccessResponse } from 'services/BackendApi';
import qs from 'qs';
import { InitializeQueryAction, INITIALIZE_QUERY } from '../actions';
import { offersSearchFailureAction, offersSearchSuccessAction, populateQueryAction } from '../actions';
import { clearBookingBuilderAction } from 'store/modules/bookingBuilder';
import { getUserCountryContext } from 'store/modules/auth';

export function* initializeQuerySaga(action: InitializeQueryAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const queryObj = yield qs.parse(action.queryString);
    const sanitizedQuery = yield call(backendApi.sanitizQueryObject, queryObj);
    const result: AxiosResponse<OffersSearchSuccessResponse> = yield call(backendApi.getOffersSearch, sanitizedQuery);
    yield put(offersSearchSuccessAction(result.data));
    yield put(populateQueryAction(sanitizedQuery));
    yield put(clearBookingBuilderAction());
  } catch (e) {
    yield put(offersSearchFailureAction(e));
    yield put(clearBookingBuilderAction());
  }
}

export function* watchInitializeQuery() {
  yield takeLatest(INITIALIZE_QUERY, initializeQuerySaga);
}
