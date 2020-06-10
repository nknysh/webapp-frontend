import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import {
  GET_BOOKING_REQUEST,
  REQUEST_TO_BOOK_REQUEST,
  CANCEL_REQUEST,
  CONFIRM_REQUEST,
  getBookingSuccessAction,
  getBookingFailureAction,
  GetBookingRequestAction,
  RequestToBookRequestAction,
  ConfirmRequestAction,
  requestToBookSuccessAction,
  requestToBookFailureAction,
  cancelSuccessAction,
  confirmSuccessAction,
  CancelRequestAction,
} from '../actions';

import { IGetBookingResponse } from 'services/BackendApi/types/BookingManagerResponse';
import { BookingBuilderDomain } from 'store/modules/bookingBuilder';
import { IReviewBookingSchema } from 'interfaces';

export function* getBookingSaga(action: GetBookingRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IGetBookingResponse> = yield call(backendApi.getBooking, action.uuid, ['travelAgent']);
    yield put(getBookingSuccessAction(result.data.data));
  } catch (e) {
    yield put(getBookingFailureAction(e));
  }
}

export function* requestToBookSaga(action: RequestToBookRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IGetBookingResponse> = yield call(
      backendApi.requestToBook,
      action.booking as BookingBuilderDomain
    );

    const booking = result.data.data;
    yield put(getBookingSuccessAction(booking));
    yield put(requestToBookSuccessAction(booking));
  } catch (e) {
    yield put(requestToBookFailureAction(e));
  }
}

export function* cancelSaga(action: CancelRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IGetBookingResponse> = yield call(backendApi.cancelBooking, action.booking);
    const booking = result.data.data;

    yield put(getBookingSuccessAction(booking));
    yield put(cancelSuccessAction(booking));
  } catch (e) {
    yield put(requestToBookFailureAction(e));
  }
}

export function* confirmSaga(action: ConfirmRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const updatingBookingData: IReviewBookingSchema = {
      status: 'confirmed',
    };

    const result: AxiosResponse<IGetBookingResponse> = yield call(
      backendApi.reviewBooking,
      action.uuid,
      updatingBookingData
    );
    const booking = result.data.data;

    yield put(getBookingSuccessAction(booking));
    yield put(confirmSuccessAction(booking));
  } catch (e) {
    yield put(requestToBookFailureAction(e));
  }
}

export function* watchGetBookingManager() {
  yield takeLatest([GET_BOOKING_REQUEST], getBookingSaga);
}

export function* watchRequestToBookRequestManager() {
  yield takeLatest([REQUEST_TO_BOOK_REQUEST], requestToBookSaga);
}

export function* watchCancelRequestManager() {
  yield takeLatest([CANCEL_REQUEST], cancelSaga);
}

export function* watchConfirmRequestManager() {
  yield takeLatest([CONFIRM_REQUEST], confirmSaga);
}
