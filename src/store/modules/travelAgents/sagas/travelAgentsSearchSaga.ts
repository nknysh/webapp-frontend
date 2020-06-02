import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  TA_REQUEST,
  taSuccessAction,
  taFailureAction,
} from '../actions';
import { ITravelAgentResponse, makeBackendApi } from 'services/BackendApi/index';
import { getUserCountryContext } from 'store/modules/auth/index';

export function* taSearchSaga() {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);

    const result: AxiosResponse<ITravelAgentResponse> = yield call(backendApi.getTravelAgents);
    yield put(taSuccessAction(result.data.data));
  } catch (e) {
    yield put(taFailureAction(e));
  }
}

export function* watchTaRequest() {
  yield takeLatest(TA_REQUEST, taSearchSaga);
}
