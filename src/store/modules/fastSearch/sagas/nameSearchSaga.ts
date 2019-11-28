import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  DESTINATION_CHANGE,
  namesSearchSuccessAction,
  namesSearchFailureAction,
  DestinationChangeAction,
} from '../actions';
import backendApi, { NameSearchResponse } from 'services/BackendApi';
import { ALL_COUNTRIES_AND_RESORTS } from '../constants';

export function* nameSearchSaga(action: DestinationChangeAction) {
  try {
    const query = action.value === ALL_COUNTRIES_AND_RESORTS ? '' : action.value;

    const result: AxiosResponse<NameSearchResponse> = yield call(backendApi.getNamesSearch, query);
    yield put(namesSearchSuccessAction(result.data.data));
  } catch (e) {
    yield put(namesSearchFailureAction(e));
  }
}

export function* watchDestinationChange() {
  yield takeLatest(DESTINATION_CHANGE, nameSearchSaga);
}
