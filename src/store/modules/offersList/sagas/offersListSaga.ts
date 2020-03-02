import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, IOffersListResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { offersListQuerySelector } from '../selectors';
import {
  GET_OFFERS_LIST_REQUEST,
  SET_FILTER,
  SET_SORT,
  SET_PAGE_NUMBER,
  SET_TRAVEL_AGENT_UUID,
  getOffersListSuccessAction,
  getOffersListFailureAction,
} from '../actions';

export function* getOffersListSaga(action: any) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const query = yield select(offersListQuerySelector);
    const result: AxiosResponse<IOffersListResponse> = yield call(backendApi.getOffersList, query);
    yield put(getOffersListSuccessAction(result.data.data, result.data.meta.total));
  } catch (e) {
    yield put(getOffersListFailureAction(e));
  }
}

export function* watchGetOffersList() {
  yield takeLatest(
    [GET_OFFERS_LIST_REQUEST, SET_FILTER, SET_SORT, SET_PAGE_NUMBER, SET_TRAVEL_AGENT_UUID],
    getOffersListSaga
  );
}
