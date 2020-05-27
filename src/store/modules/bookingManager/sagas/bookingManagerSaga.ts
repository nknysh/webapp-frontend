import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import {
  getBookingSuccessAction,
  getBookingFailureAction,
  GET_BOOKING_REQUEST,
  GetBookingRequestAction,
} from '../actions';
import { IGetBookingResponse } from 'services/BackendApi/types/BookingManagerResponse';

export function* getBookingSaga(action: GetBookingRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IGetBookingResponse> = yield call(backendApi.getBooking, action.uuid);
    yield put(getBookingSuccessAction(result.data.data));
  } catch (e) {
    yield put(getBookingFailureAction(e));
  }
}

export function* watchGetBookingManager() {
  yield takeLatest([GET_BOOKING_REQUEST], getBookingSaga);
}
