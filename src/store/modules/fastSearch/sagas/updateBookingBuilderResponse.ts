import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  OPTIONS_REQUEST,
  optionsFailureAction,
  optionsSuccessAction,
  UPDATE_TRANSFER,
  UPDATE_LODGING_GUEST_AGES_ACTION,
  UPDATE_LODGING_MEAL_PLAN_ACTION,
  UPDATE_LODGING_OCCASIONS_ACTION,
  ADD_LODGING_ACTION,
  REMOVE_LODGING_ACTION,
  UPDATE_GROUND_SERVICE_ACTION,
  UPDATE_SUPPLEMENT_ACTION,
  UPDATE_FINE_ACTION,
  updateBookingSuccessAction,
 UpdateTransferAction
} from '../actions';

import backendApi, { BookingBuilderEndpointSuccess } from 'services/BackendApi';
import { bookingRequestSelector } from '../selectors';

export function* bookingBuilderResponseSaga(action: any) {
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
  yield takeLatest(
    [
      UPDATE_TRANSFER,
      UPDATE_LODGING_GUEST_AGES_ACTION,
      UPDATE_LODGING_MEAL_PLAN_ACTION,
      ADD_LODGING_ACTION,
      UPDATE_LODGING_OCCASIONS_ACTION,
      REMOVE_LODGING_ACTION,
      UPDATE_GROUND_SERVICE_ACTION,
      UPDATE_SUPPLEMENT_ACTION,
      UPDATE_FINE_ACTION,
    ],
    bookingBuilderResponseSaga
  );
}
