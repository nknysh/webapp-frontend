import { call, takeLatest, select, put } from 'redux-saga/effects';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { offerSelector } from '../subdomains/offer/selectors';
import { uiStateSelector } from '../subdomains/uiState/selectors';
import { IOfferUI } from '../../../../services/BackendApi/types/OfferResponse';
import {
  PUT_OFFER_REQUEST,
  putOfferSuccessAction,
  putOfferFailureAction,
  postOffersOrderRequestAction,
} from '../actions';

import { transformUiOfferToApiOffer, transformApiOfferToUiOffer } from '../utils';
import { IOfferUiState } from '../model';

export function* putOfferRequestSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const uiOffer: IOfferUI = yield select(offerSelector);
    const uiState: IOfferUiState = yield select(uiStateSelector);
    const backendApi = makeBackendApi(actingCountryCode);

    const { response, error } = yield call(backendApi.putOffer, transformUiOfferToApiOffer(uiOffer, uiState));

    if (response) {
      yield put(putOfferSuccessAction(transformApiOfferToUiOffer(response.data.data)));
      yield put(postOffersOrderRequestAction(uiState.orderedOffersList));
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
