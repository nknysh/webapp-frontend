import { call, takeLatest, select, put } from 'redux-saga/effects';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { offerSelector } from '../subdomains/offer/selectors';
import { uiStateSelector } from '../subdomains/uiState/selectors';
import { IOfferUI } from '../../../../services/BackendApi/types/OfferResponse';
import {
  POST_OFFER_REQUEST,
  postOfferSuccessAction,
  postOfferFailureAction,
  postOffersOrderRequestAction,
  PostOfferRequestAction
} from '../actions';
import { getBootstrapHotelsSelector } from 'store/modules/bootstrap/selectors';
import { IBootstrapHotel } from '../../bootstrap/model';
import { transformUiOfferToApiOffer } from '../utils';
import { IOfferUiState } from '../model';

export function* postOfferRequestSaga(action: PostOfferRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const uiOffer: IOfferUI = yield select(offerSelector);
    const uiState: IOfferUiState = yield select(uiStateSelector);

    const hotels: IBootstrapHotel[] = yield select(getBootstrapHotelsSelector);
    const backendApi = makeBackendApi(actingCountryCode);

    const { response, error } = yield call(backendApi.postOffer, transformUiOfferToApiOffer(uiOffer, uiState));
    if (response) {
      const offerWithHotel = {
        ...response.data.data,
        hotel: {
          name: hotels.find(h => h.uuid === uiOffer.hotelUuid)?.name,
        },
      };
      
      yield put(postOfferSuccessAction(offerWithHotel));
      
      const uiStateAfterPost: IOfferUiState = yield select(uiStateSelector);
      yield put(postOffersOrderRequestAction(uiStateAfterPost.orderedOffersList));

      yield call(action.history.replace, `/offer/${response.data.data.uuid}/edit`);
    } else {
      yield put(postOfferFailureAction(error.response.data.errors));
    }

  } catch (e) {
    // TODO: Need an unexpected error handler
    console.error(e);
  }
}

export function* watchPostOfferRequest() {
  yield takeLatest(POST_OFFER_REQUEST, postOfferRequestSaga);
}
