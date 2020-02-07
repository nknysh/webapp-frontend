import { takeLatest, select, call } from 'redux-saga/effects';
import { without } from 'ramda';
import qs from 'qs';
import { UPDATE_QUERY_STRING } from '../actions';
import { offersQuerySelector } from '../selectors';
import { ALL_COUNTRIES_AND_RESORTS } from '../constants';
import { MealPlanNames } from 'services/BackendApi';

export function* updateQueryStringSaga() {
  console.log(UPDATE_QUERY_STRING);
  // We need to sanitize the query a little
  const query = yield select(offersQuerySelector);
  const sanitizedQuery = yield {
    ...query,
    startDate: query.startDate.split('T')[0],
    endDate: query.endDate.split('T')[0],
    name: query.name === ALL_COUNTRIES_AND_RESORTS ? '' : query.name,
    mealPlanCategories: without([MealPlanNames.ANY], query.mealPlanCategories),
  };
  const params = yield qs.stringify(sanitizedQuery);
  yield call(window.history.replaceState, {}, '', decodeURIComponent(`${location.pathname}?${params}`));
}

export function* watchUpdateQueryString() {
  yield takeLatest(UPDATE_QUERY_STRING, updateQueryStringSaga);
}
