import { call, takeLatest, select, put, all } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, IOffersDeleteResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import {
  bulkActionSelectedUuidsSelector,
  totalResultsSelector,
  itemsPerPageSelector,
  currentPageSelector,
} from '../selectors';
import {
  CONFIRM_REQUEST_TO_DELETE_OFFERS,
  offersDeleteSuccessAction,
  offersDeleteFailAction,
  setPageNumberAction,
  getOffersListRequestAction,
} from '../actions';

export function* deleteOffersSaga(action: any) {
  try {
    const [actingCountryCode, uuids, originalTotalResults, itemsPerPage, originalCurrentPage] = yield all([
      select(getUserCountryContext),
      select(bulkActionSelectedUuidsSelector),
      select(totalResultsSelector),
      select(itemsPerPageSelector),
      select(currentPageSelector),
    ]);

    const backendApi = makeBackendApi(actingCountryCode);

    const result: AxiosResponse<IOffersDeleteResponse> = yield call(backendApi.deleteOffers, uuids);

    const totalDeleted = result.data.meta.total;

    // if new MAX pages is less than what their original page was, put them on
    // page 1. otherwise, keep them on the page
    const newMaxPages = Math.ceil((originalTotalResults - totalDeleted) / itemsPerPage);
    if (newMaxPages < originalCurrentPage) {
      yield put(setPageNumberAction(1));
    }

    yield put(offersDeleteSuccessAction());
    yield put(getOffersListRequestAction());
  } catch (e) {
    yield put(offersDeleteFailAction('offersListDeleteError'));
  }
}

export function* watchConfirmRequestToDeleteOffersSaga() {
  yield takeLatest([CONFIRM_REQUEST_TO_DELETE_OFFERS], deleteOffersSaga);
}
