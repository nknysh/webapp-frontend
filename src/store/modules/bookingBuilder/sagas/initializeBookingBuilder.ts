import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  INITIALIZE_BOOKING_BUILDER,
  InitializeBookingBuilderAction,
  copyBookingBuilderAction,
  createStubBookingBuilderAction,
  initializeBookingBuilderFailureAction,
} from '../actions';
import { bookingBuilderSelector } from 'store/modules/fastSearch/selectors';
import backendApi from 'services/BackendApi';

export function* initializeBookingBuilderSaga(action: InitializeBookingBuilderAction) {
  console.log('initializeBookingBuilderSaga');
  try {
    const existingBookingBuilder = yield select(bookingBuilderSelector);
    if (existingBookingBuilder) {
      yield put(copyBookingBuilderAction(existingBookingBuilder));
    } else {
      const hotel = yield call(backendApi.getHotel, action.hotelUuid);
      yield put(createStubBookingBuilderAction(hotel));
    }
  } catch (e) {
    yield put(initializeBookingBuilderFailureAction());
  }
}

export function* watchInitializeBookingBuilder() {
  yield takeLatest(INITIALIZE_BOOKING_BUILDER, initializeBookingBuilderSaga);
}
