import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  OFFERS_SEARCH_REQUEST,
  offersSearchFailureAction,
  offersSearchSuccessAction,
  SearchRequestAction,
} from '../actions';
import backendApi, { OffersSearchSuccessResponse } from 'services/BackendApi';
import { AxiosResponse } from 'axios';

export function* offersSearchRequestSaga(action: SearchRequestAction) {
  try {
    const result: AxiosResponse<OffersSearchSuccessResponse> = yield call(backendApi.getOffersSearch, action.query);
    yield put(offersSearchSuccessAction(result.data));
  } catch (e) {
    yield put(offersSearchFailureAction(e));
  }
}

export function* watchOffersSearchRequest() {
  yield takeLatest(OFFERS_SEARCH_REQUEST, offersSearchRequestSaga);
}
