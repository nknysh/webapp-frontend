import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { without } from 'ramda';
import { makeBackendApi, OffersSearchSuccessResponse, MealPlanNames } from 'services/BackendApi';
import { ALL_COUNTRIES_AND_RESORTS } from '../constants';
import qs from 'qs';
import {
  OFFERS_SEARCH_REQUEST,
  offersSearchFailureAction,
  offersSearchSuccessAction,
  SearchRequestAction,
  ISearchMetadata
} from '../actions';
import { clearBookingBuilderAction } from 'store/modules/bookingBuilder';
import { getUserCountryContext } from 'store/modules/auth';

function* getActingCountryCode(metadata?: ISearchMetadata) {
  if (metadata) {
    return metadata.predefinedCompanyCountryCode;
  }
  else {
    return yield select(getUserCountryContext);
  }
}

export function* offersSearchRequestSaga(action: SearchRequestAction) {
  // We need to sanitize the query a little
  const query = action.query;
  const sanitizedQuery = {
    ...query,
    startDate: query.startDate.split('T')[0],
    endDate: query.endDate.split('T')[0],
    name: action.query.name === ALL_COUNTRIES_AND_RESORTS ? '' : action.query.name,
    mealPlanCategories: without([MealPlanNames.ANY], query.mealPlanCategories),
  };

  try {
    const actingCountryCode = yield getActingCountryCode(action.searchMetadata);
    const backendApi = makeBackendApi(actingCountryCode);
    const result: AxiosResponse<OffersSearchSuccessResponse> = yield call(backendApi.getOffersSearch, sanitizedQuery);
    yield put(offersSearchSuccessAction(result.data));
    yield put(clearBookingBuilderAction());
  } catch (e) {
    yield put(offersSearchFailureAction(e));
    yield put(clearBookingBuilderAction());
  } finally {
    const params = qs.stringify(sanitizedQuery);
    window.history.replaceState({}, '', decodeURIComponent(`${location.pathname}?${params}`));
  }
}

export function* watchOffersSearchRequest() {
  yield takeLatest(OFFERS_SEARCH_REQUEST, offersSearchRequestSaga);
}
