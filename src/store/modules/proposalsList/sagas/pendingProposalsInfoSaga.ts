import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, IProposalsListResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import {
  GET_PENDING_PROPOSALS_INFO_REQUEST,
  getPendingProposalsInfoSuccessAction,
  getPendingProposalsInfoFailureAction  
} from '../subdomains/pendingProposals/actions';

import { BOOTSTRAP_APP_REQUEST } from '../../bootstrap/actions';
import { AUTH_LOG_IN_SUCCESS } from '../../auth/actions';
import { PROPOSALS_NEW_SUCCESS, PROPOSAL_COMPLETE_SUCCESS } from '../../proposals/actions';


export function* getPendingProposalsCountSaga(action: any) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);    
    const { data }: AxiosResponse<IProposalsListResponse> = yield call(backendApi.getPendingProposalsInfo);
    
    yield put(getPendingProposalsInfoSuccessAction(data.meta.total, data.data[0]));
  } catch (e) {
    yield put(getPendingProposalsInfoFailureAction(e));
  }
}

export function* watchGetPendingProposalsInfo() {
  yield takeLatest(
    [
      GET_PENDING_PROPOSALS_INFO_REQUEST,
      BOOTSTRAP_APP_REQUEST,
      AUTH_LOG_IN_SUCCESS,
      PROPOSALS_NEW_SUCCESS,
      PROPOSAL_COMPLETE_SUCCESS
    ],
    getPendingProposalsCountSaga
  );
}
