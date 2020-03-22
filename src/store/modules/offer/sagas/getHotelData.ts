import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import { makeBackendApi, IOfferResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { GET_OFFER_REQUEST } from '../actions';
import {
  OfferHotelUuidChangeAction,
  offerHotelUuidChangeSuccessAction,
  OFFER_HOTEL_UUID_CHANGE,
} from '../subdomains/offer/actions';

export function* getHotelDataSaga(action: OfferHotelUuidChangeAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<any> = yield call(backendApi.getHotel, action.hotelUuid, ['accommodationProducts']);
    yield put(offerHotelUuidChangeSuccessAction(result.data.data.accommodationProducts));
  } catch (e) {
    throw e;
  }
}

export function* watchOfferHotelUuidChangeAction() {
  yield takeLatest(OFFER_HOTEL_UUID_CHANGE, getHotelDataSaga);
}
