import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, IBookingsListResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { bookingsListQuerySelector } from '../selectors';
import { GET_HOTEL_NAMES_REQUEST, getHotelNamesSuccessAction, getHotelNamesFailureAction } from '../actions';
import { IHotelNamesResponse } from 'services/BackendApi';

export function* getHotelNamesSaga(action: any) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IHotelNamesResponse> = yield call(backendApi.getHotelsAsHotelNames);
    yield put(getHotelNamesSuccessAction(result.data.data));
  } catch (e) {
    yield put(getHotelNamesFailureAction(e.message));
  }
}

export function* watchGetHotelNames() {
  yield takeLatest([GET_HOTEL_NAMES_REQUEST], getHotelNamesSaga);
}
