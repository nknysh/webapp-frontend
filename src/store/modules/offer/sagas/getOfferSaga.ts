import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import { GET_OFFER_REQUEST, GetOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from '../actions';
import { makeBackendApi, IOfferResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { arrayOfObjectsToMapping } from 'utils';

const getAllAssociatedProductUuidsFromOffer = (offer: any) => {
  const productUuids = [...(offer.prerequisites.accommodationProducts || [])];

  if (offer.productDiscounts != undefined) {
    Object.values(offer.productDiscounts).map((productBlocks: any[]) => {
      productBlocks.forEach(productBlock => {
        productBlock.products.map(p => {
          productUuids.push(p.uuid);
        });
      });
    });
  }

  if (offer.subProductDiscounts != undefined) {
    Object.values(offer.subProductDiscounts).map((productBlocks: any[]) => {
      productBlocks.forEach(productBlock => {
        productBlock.products.map(p => {
          productUuids.push(p.uuid);
        });
      });
    });
  }
  return productUuids;
};

export function* getOfferRequestSaga(action: GetOfferRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<IOfferResponse> = yield call(backendApi.getOffer, action.offerId);
    const offer = result.data.data;

    let associatedOffersResult: any = null;
    let associatedProductsResult: any = null;
    const associatedProductUuids = getAllAssociatedProductUuidsFromOffer(offer);
    const offerUuids = [...(offer.combinesWith || []), ...(offer.cannotCombineWith || [])];

    if (associatedProductUuids.length >= 1) {
      associatedProductsResult = yield call(backendApi.getProductsAsUuidAndName, associatedProductUuids);
    }
    if (offerUuids.length >= 1) {
      associatedOffersResult = yield call(backendApi.getOffersAsUuidAndName, offerUuids);
    }
    const offersOnHotelResult = yield call(backendApi.getOffersForHotel, offer.hotelUuid);

    yield put(
      getOfferSuccessAction(
        offer,
        associatedOffersResult ? arrayOfObjectsToMapping(associatedOffersResult.data.data, 'uuid', 'name') : {},
        associatedProductsResult ? arrayOfObjectsToMapping(associatedProductsResult.data.data, 'uuid', 'name') : {},
        offersOnHotelResult.data.data
      )
    );
  } catch (e) {
    console.error(e);
    yield put(getOfferFailureAction(e));
  }
}

export function* watchGetOfferRequest() {
  yield takeLatest(GET_OFFER_REQUEST, getOfferRequestSaga);
}
