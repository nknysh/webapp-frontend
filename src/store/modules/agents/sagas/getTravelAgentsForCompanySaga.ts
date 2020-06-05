import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, ITravelAgentResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import {
  getTravelAgentsByCompanyIdSuccessAction,
  getTravelAgentsByCompanyIdFailureAction,
  SelectedCompanyChangeAction,
  SELECTED_COMPANY_CHANGE
} from '../actions';

export function* getTravelAgentBycompanyIdRequestSaga(action: SelectedCompanyChangeAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const companyUuid = action.value && action.value.uuid;
    if (companyUuid) {
      const result: AxiosResponse<ITravelAgentResponse> = yield call(backendApi.getTravelAgentsByCompanyId, companyUuid);
      yield put(getTravelAgentsByCompanyIdSuccessAction(result.data.data));
    }
  } catch (e) {
    yield put(getTravelAgentsByCompanyIdFailureAction(e.message));
  }
}

export function* watchGetTravelAgentBycompanyIdRequest() {
  yield takeLatest([SELECTED_COMPANY_CHANGE], getTravelAgentBycompanyIdRequestSaga);
}
