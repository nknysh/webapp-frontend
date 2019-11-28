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

import { bookingBuilderSelector } from 'store/modules/bookingBuilder';
import { backwardCompatBookingBuilderAction } from 'store/modules/bookings';

export function* initializeBookingBuilderSaga(action: InitializeBookingBuilderAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const existingBookingBuilder = yield select(fastSearchBookingBuilderSelector);
    if (existingBookingBuilder) {
      yield put(copyBookingBuilderAction(existingBookingBuilder));

      const currentBookingBuilder = yield select(bookingBuilderSelector);

      // this action ensures that every single time we update our new booking builder response, we keep the old `bookings` domain in sync
      // this is done because there is a lot of code that relies on the old `bookings` domain data
      // @see https://pureescapes.atlassian.net/browse/OWA-1030
      yield put(
        backwardCompatBookingBuilderAction(
          action.hotelUuid,
          currentBookingBuilder.request,
          currentBookingBuilder.response
        )
      );
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
