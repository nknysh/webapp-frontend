import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { without } from 'ramda';
import backendApi, { OffersSearchSuccessResponse, MealPlanNames } from 'services/BackendApi';
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
    name: query.name === '' ? null : query.name,
    mealPlanCategories: without([MealPlanNames.ANY], query.mealPlanCategories),
  };

  try {
    const result: AxiosResponse<OffersSearchSuccessResponse> = yield call(backendApi.getOffersSearch, sanitizedQuery);
    yield put(offersSearchSuccessAction(result.data));
  } catch (e) {
    yield put(offersSearchFailureAction(e));
  }
}

export function* watchOffersSearchRequest() {
  yield takeLatest(OFFERS_SEARCH_REQUEST, offersSearchRequestSaga);
}
