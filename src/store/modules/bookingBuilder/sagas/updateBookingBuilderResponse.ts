import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import { taMarginTypeSelector, taMarginAmountSelector, travelAgentUserUuidSelector } from '../selectors';
import {
  updateBookingSuccessAction,
  UPDATE_TRANSFER,
  UPDATE_LODGING_GUEST_AGES_ACTION,
  UPDATE_LODGING_MEAL_PLAN_ACTION,
  UPDATE_LODGING_OCCASIONS_ACTION,
  ADD_LODGING_ACTION,
  REMOVE_LODGING_ACTION,
  UPDATE_GROUND_SERVICE_ACTION,
  UPDATE_SUPPLEMENT_ACTION,
  UPDATE_FINE_ACTION,
  UPDATE_LODGING_DATES_ACTION,
  UPDATE_TA_MARGIN_AMOUNT_ACTION,
  UPDATE_TA_MARGIN_TYPE_ACTION,
  UPDATE_IS_TA_MARGIN_APPLIED_ACTION,
  UPDATE_TRAVEL_AGENT_USER_ID,
  SAVE_CUSTOM_ITEM,
  REMOVE_CUSTOM_ITEM,
} from '../actions';

import { makeBackendApi, BookingBuilderEndpointSuccess, BookingBuilderRequest } from 'services/BackendApi';
import { bookingRequestSelector } from '../selectors';
import { getUserCountryContext } from 'store/modules/auth';

import { backwardCompatBookingBuilderAction } from 'store/modules/bookings';

export function* bookingBuilderResponseSaga(action: any) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const request: BookingBuilderRequest = yield select(bookingRequestSelector);
    if (!request || !request.Accommodation || request.Accommodation.length <= 0) {
      return;
    }
    const bookingBuilderEndpointResponse: AxiosResponse<BookingBuilderEndpointSuccess> = yield call(
      backendApi.postBookingBuilderRequest,
      request
    );

    const marginType = yield select(taMarginTypeSelector);
    const marginAmount = yield select(taMarginAmountSelector);
    const travelAgentUserUuid = yield select(travelAgentUserUuidSelector);

    yield put(updateBookingSuccessAction(bookingBuilderEndpointResponse.data.data, action.hotelUuid));

    // this action ensures that every single time we update our new booking builder response, we keep the old `bookings` domain in sync
    // this is done because there is a lot of code that relies on the old `bookings` domain data
    // @see https://pureescapes.atlassian.net/browse/OWA-1030
    yield put(
      backwardCompatBookingBuilderAction(
        action.hotelUuid,
        request,
        bookingBuilderEndpointResponse.data.data,
        marginType,
        marginAmount,
        travelAgentUserUuid
      )
    );
  } catch (e) {
    console.error(e);
  }
}

export function* watchBookingActions() {
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
      UPDATE_LODGING_DATES_ACTION,
      UPDATE_TA_MARGIN_AMOUNT_ACTION,
      UPDATE_TA_MARGIN_TYPE_ACTION,
      UPDATE_IS_TA_MARGIN_APPLIED_ACTION,
      UPDATE_TRAVEL_AGENT_USER_ID,
      SAVE_CUSTOM_ITEM,
      REMOVE_CUSTOM_ITEM,
    ],
    bookingBuilderResponseSaga
  );
}
