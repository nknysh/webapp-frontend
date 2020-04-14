import { call, takeLatest, select, put, take } from 'redux-saga/effects';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { offerSelector } from '../subdomains/offer/selectors';
import { uiStateSelector } from '../subdomains/uiState/selectors';
import { mergedOrderedOffersListSelector } from '../crossdomainSelectors';
import { IOfferUI } from '../../../../services/BackendApi/types/OfferResponse';
import {
  POST_OFFER_REQUEST,
  POST_OFFERS_ORDER_SUCCESS,
  POST_OFFERS_ORDER_FAILURE,

  postOfferSuccessAction,
  postOfferFailureAction,
  postOffersOrderRequestAction,
  PostOfferRequestAction
} from '../actions';
import { getBootstrapHotelsSelector } from 'store/modules/bootstrap/selectors';
import { IBootstrapHotel } from '../../bootstrap/model';
import { transformUiOfferToApiOffer, toOrderedOffer } from '../utils';
import { IOfferUiState, OrderedOffer } from '../model';

export function* postOfferRequestSaga(action: PostOfferRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const uiOffer: IOfferUI = yield select(offerSelector);
    const uiState: IOfferUiState = yield select(uiStateSelector);
    const orderedOffers: OrderedOffer[] = yield select(mergedOrderedOffersListSelector);

    const hotels: IBootstrapHotel[] = yield select(getBootstrapHotelsSelector);
    const backendApi = makeBackendApi(actingCountryCode);

    const { response, error } = yield call(backendApi.postOffer, transformUiOfferToApiOffer(uiOffer, uiState));
    console.log(response.data.data);
    if (response) {
      const offerWithHotel = {
        ...response.data.data,
        hotel: {
          name: hotels.find(h => h.uuid === uiOffer.hotelUuid)?.name,
          countryCode: hotels.find(h => h.uuid === uiOffer.hotelUuid)?.countryCode,
        },
      };
      
      yield put(postOfferSuccessAction(offerWithHotel));

      const updatedOrderedOffers = orderedOffers.map(
        item => item.selected ? toOrderedOffer(offerWithHotel) : item
      );
     
      yield put(postOffersOrderRequestAction(updatedOrderedOffers));
      yield take([POST_OFFERS_ORDER_SUCCESS, POST_OFFERS_ORDER_FAILURE]);

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
