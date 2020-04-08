import { call, takeLatest, select, put } from 'redux-saga/effects';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { offerSelector } from '../subdomains/offer/selectors';
import { uiStateSelector } from '../subdomains/uiState/selectors';
import { IOfferUI } from '../../../../services/BackendApi/types/OfferResponse';
import { PUT_OFFER_REQUEST, putOfferSuccessAction, putOfferFailureAction } from '../actions';
import { transformUiOfferToApiOffer } from '../utils';
import { IOfferUiState } from '../model';

export function* putOfferRequestSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const uiOffer: IOfferUI = yield select(offerSelector);
    const uiState: IOfferUiState = yield select(uiStateSelector);
    const backendApi = makeBackendApi(actingCountryCode);

    const putOfferRes = yield call(backendApi.putOffer, transformUiOfferToApiOffer(uiOffer, uiState));
    let postOffersOrderRes;

    if(putOfferRes.response) {
      postOffersOrderRes = yield call(
        backendApi.postOffersOrder,
        {
          hotelUuid: uiOffer.hotelUuid,
          offers: uiState.orderedOffersList.map(item => item.uuid)
        }
      );
    }

    if (putOfferRes.response && postOffersOrderRes?.response) {
      yield put(putOfferSuccessAction(
        putOfferRes.response.data.data,
        postOffersOrderRes.response.data.data
      ));
    } else {
      yield put(putOfferFailureAction(
        putOfferRes?.error.response.data.errors ||
        postOffersOrderRes?.error.response.data.errors
      ));
    }


  } catch (e) {
    // TODO: Need an unexpected error handler
    console.error(e);
  }
}

export function* watchPutOfferRequest() {
  yield takeLatest(PUT_OFFER_REQUEST, putOfferRequestSaga);
}
