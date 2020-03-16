import { call, takeLatest, select, put } from 'redux-saga/effects';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { offerSelector } from '../subdomains/offer/selectors';
import { IOffer } from '../../../../services/BackendApi/types/OfferResponse';
import { PUT_OFFER_REQUEST, putOfferSuccessAction, putOfferFailureAction } from '../actions';

export function* putOfferRequestSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const offer: IOffer = yield select(offerSelector);
    const backendApi = makeBackendApi(actingCountryCode);
    const { response, error } = yield call(backendApi.putOffer, offer);
    if (response) {
      yield put(putOfferSuccessAction(response.data.data));
    } else {
      yield put(putOfferFailureAction(error.response.data.errors));
    }
  } catch (e) {
    // TODO: Need an unexpected error handler
    console.error(e);
  }
}

export function* watchPutOfferRequest() {
  yield takeLatest(PUT_OFFER_REQUEST, putOfferRequestSaga);
}
