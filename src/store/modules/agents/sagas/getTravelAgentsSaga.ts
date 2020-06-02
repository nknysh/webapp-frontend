import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, ITravelAgentResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { GetTravelAgentRequestAction } from '../actions';
import { getTravelAgentsSuccessAction, getTravelAgentsFailureAction, GET_TRAVEL_AGENTS_REQUEST } from '../actions';
import { agentsSelector } from '../selectors';

export function* getTravelAgentsRequestSaga(action: GetTravelAgentRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const currentAgents = yield select(agentsSelector);

    if (!currentAgents || (currentAgents && action.forceLoad)) {
      const result: AxiosResponse<ITravelAgentResponse> = yield call(backendApi.getTravelAgents);
      yield put(getTravelAgentsSuccessAction(result.data.data));
    }

    if (currentAgents && !action.forceLoad) {
      yield put(getTravelAgentsSuccessAction(currentAgents));
    }
  } catch (e) {
    yield put(getTravelAgentsFailureAction(e.message));
  }
}

export function* watchGetTravelAgentsRequest() {
  yield takeLatest([GET_TRAVEL_AGENTS_REQUEST], getTravelAgentsRequestSaga);
}
