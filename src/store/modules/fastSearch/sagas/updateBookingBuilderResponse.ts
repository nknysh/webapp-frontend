import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  OPTIONS_REQUEST,
  optionsFailureAction,
  optionsSuccessAction,
  UPDATE_TRANSFER,
  UpdateTransferAction,
  updateBookingSuccessAction,
} from '../actions';
import backendApi, { BookingBuilderEndpointSuccess } from 'services/BackendApi';
import { bookingRequestSelector } from '../selectors';

export function* bookingBuilderResponseSaga(action: UpdateTransferAction) {
  try {
    const request = yield select(bookingRequestSelector);
    const bookingBuilderEndpointResponse: AxiosResponse<BookingBuilderEndpointSuccess> = yield call(
      backendApi.postBookingBuilderRequest,
      request
    );

    yield put(updateBookingSuccessAction(bookingBuilderEndpointResponse.data.data, action.hotelUuid));
  } catch (e) {
    // yield put(bookingRequestFailureAction(e));
  }
}

export function* watchTransferUpdate() {
  yield takeLatest(UPDATE_TRANSFER, bookingBuilderResponseSaga);
}
