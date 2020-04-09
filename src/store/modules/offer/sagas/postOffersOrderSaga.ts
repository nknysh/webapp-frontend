import { call, takeLatest, select, put } from 'redux-saga/effects';
import { makeBackendApi } from 'services/BackendApi';
import { IOfferUI } from 'services/BackendApi/types/OfferResponse';
import { getUserCountryContext } from 'store/modules/auth';
import { offerSelector } from '../subdomains/offer/selectors';

import {
  POST_OFFERS_ORDER_REQUEST,
  
  postOffersOrderSuccessAction,
  postOffersOrderFailureAction,
  
  PostOffersOrderRequestAction
} from '../actions';

export function* postOffersOrderRequestSaga(action: PostOffersOrderRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const uiOffer: IOfferUI = yield select(offerSelector);
    
    const backendApi = makeBackendApi(actingCountryCode);

    const { response, error } = yield call(
      backendApi.postOffersOrder,
      {
        hotelUuid: uiOffer.hotelUuid,
        offers: action.orderedOffers.map(item => item.uuid)
      }
    );
      
    if(response){
      yield put(postOffersOrderSuccessAction(response.data.data));
    } else {
      yield put(postOffersOrderFailureAction(error.response.data.errors));
    }

  } catch (e) {
    // TODO: Need an unexpected error handler
    console.error(e);
  }
}

export function* watchPostOffersOrderRequestSaga() {
  yield takeLatest(POST_OFFERS_ORDER_REQUEST, postOffersOrderRequestSaga);
}
