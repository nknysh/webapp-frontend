import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  INITIALIZE_BOOKING_BUILDER,
  InitializeBookingBuilderAction,
  copyBookingBuilderAction,
  createStubBookingBuilderAction,
  initializeBookingBuilderFailureAction,
} from '../actions';
import { fastSearchBookingBuilderSelector } from 'store/modules/fastSearch/selectors';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';

export function* initializeBookingBuilderSaga(action: InitializeBookingBuilderAction) {
  try {
  const actingCountryCode = yield select(getUserCountryContext);
  const backendApi = makeBackendApi(actingCountryCode);
    const existingBookingBuilder = yield select(fastSearchBookingBuilderSelector);
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
