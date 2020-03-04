import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import { GET_OFFER_REQUEST, GetOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from '../actions';
import { makeBackendApi, IOfferResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';

export function* getOfferRequestSage(action: GetOfferRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IOfferResponse> = yield call(backendApi.getOffer, action.offerId);
    yield put(getOfferSuccessAction(result.data.data));
  } catch (e) {
    yield put(getOfferFailureAction(e));
  }
}

export function* watchGetOfferRequest() {
  yield takeLatest(GET_OFFER_REQUEST, getOfferRequestSage);
}
