import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import { makeBackendApi, IOfferResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { arrayOfObjectsToMapping } from 'utils';
import { getAllAssociatedProductUuidsFromOffer, hasOfferGotApplications } from '../utils';
import { GetOfferRequestAction, getOfferSuccessAction, getOfferFailureAction, GET_OFFER_REQUEST } from '../actions';

export function* getOfferRequestSaga(action: GetOfferRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IOfferResponse> = yield call(backendApi.getOffer, action.offerId);
    const offer = result.data.data;

    let associatedOffersResult: AxiosResponse | null = null;
    let associatedProductsResult: AxiosResponse | null = null;
    const associatedProductUuids = getAllAssociatedProductUuidsFromOffer(offer);
    const offerUuids = [...(offer.combinesWith || []), ...(offer.cannotCombineWith || [])];

    if (associatedProductUuids.length >= 1) {
      associatedProductsResult = yield call(backendApi.getProductsAsUuidAndName, associatedProductUuids);
    }
    if (offerUuids.length >= 1) {
      associatedOffersResult = yield call(backendApi.getOffersAsUuidAndName, offerUuids);
    }
    const offersOnHotelResult = yield call(backendApi.getOffersForHotel, offer.hotelUuid);

    const isTextOnly = offer.furtherInformation && !hasOfferGotApplications(offer);

    // if the action says we need to load hotel accommodation products, do that too
    let accommodationProductsForHotel = [];
    if (action.shouldFetchHotelAccommodationProducts) {
      const accommodationProductsForHotelResult = yield call(
        backendApi.getAccommodationProductsForHotel,
        offer.hotelUuid
      );
      accommodationProductsForHotel = accommodationProductsForHotelResult.data.data;
    }

    yield put(
      getOfferSuccessAction(
        offer,
        associatedOffersResult ? arrayOfObjectsToMapping(associatedOffersResult.data.data, 'uuid', 'name') : {},
        associatedProductsResult ? arrayOfObjectsToMapping(associatedProductsResult.data.data, 'uuid', 'name') : {},
        offersOnHotelResult.data.data,
        isTextOnly,
        accommodationProductsForHotel
      )
    );
  } catch (e) {
    yield put(getOfferFailureAction(e));
  }
}

export function* watchGetOfferRequest() {
  yield takeLatest(GET_OFFER_REQUEST, getOfferRequestSaga);
}
