import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import {
  TA_COMPANY_CHANGE,
  TaCompanyChangeAction,
  taSearchSuccessAction,
  taSearchFailureAction,
} from '../actions';
import {
  taCompaniesSelector,
} from '../selectors';
import { ITravelAgentResponse, makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';

export function* taSearchSaga(action: TaCompanyChangeAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const companies = yield select(taCompaniesSelector);
    const companyUuid = companies.find(c => c.name === action.value).uuid;

    const result: AxiosResponse<ITravelAgentResponse> = yield call(backendApi.getTravelAgentsByCompanyId, companyUuid);
    yield put(taSearchSuccessAction(result.data.data));
  } catch (e) {
    yield put(taSearchFailureAction(e));
  }
}

export function* watchTaCompanyChange() {
  yield takeLatest(TA_COMPANY_CHANGE, taSearchSaga);
}
