import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, IBookingsListResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { bookingsListQuerySelector } from '../selectors';
import {
  GET_BOOKING_LIST_REQUEST,
  SET_FILTER,
  SET_SORT,
  SET_PAGE_NUMBER,
  getBookingListSuccessAction,
  getBookingListFailureAction,
  SET_TRAVEL_AGENT_UUID,
  SET_HOTEL,
  SET_STATUS,
} from '../actions';

export function* getBookingsListSaga(action: any) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const query = yield select(bookingsListQuerySelector);
    const result: AxiosResponse<IBookingsListResponse> = yield call(backendApi.getBookingsList, query);
    yield put(getBookingListSuccessAction(result.data.data, result.data.meta.total));
  } catch (e) {
    yield put(getBookingListFailureAction(e));
  }
}

export function* watchGetBookingsList() {
  yield takeLatest(
    [GET_BOOKING_LIST_REQUEST, SET_FILTER, SET_SORT, SET_PAGE_NUMBER, SET_TRAVEL_AGENT_UUID, SET_HOTEL, SET_STATUS],
    getBookingsListSaga
  );
}
