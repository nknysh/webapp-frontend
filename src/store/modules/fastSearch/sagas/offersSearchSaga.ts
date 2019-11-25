import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { without } from 'ramda';
import backendApi, { OffersSearchSuccessResponse, MealPlanNames } from 'services/BackendApi';
import { ALL_COUNTRIES_AND_RESORTS } from '../constants';
import qs from 'qs';
import {
  OFFERS_SEARCH_REQUEST,
  offersSearchFailureAction,
  offersSearchSuccessAction,
  SearchRequestAction,
} from '../actions';

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
    const result: AxiosResponse<OffersSearchSuccessResponse> = yield call(backendApi.getOffersSearch, sanitizedQuery);
    yield put(offersSearchSuccessAction(result.data));
  } catch (e) {
    yield put(offersSearchFailureAction(e));
  } finally {
    const params = qs.stringify(sanitizedQuery);
    window.history.replaceState({}, '', decodeURIComponent(`${location.pathname}?${params}`));
  }
}

export function* watchOffersSearchRequest() {
  yield takeLatest(OFFERS_SEARCH_REQUEST, offersSearchRequestSaga);
}
