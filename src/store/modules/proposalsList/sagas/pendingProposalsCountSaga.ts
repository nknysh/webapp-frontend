import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, IProposalsListResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import {
  GET_PENDING_PROPOSALS_COUNT_REQUEST,
  getPendingProposalsCountSuccessAction,
  getPendingProposalsCountFailureAction  
} from '../subdomains/pendingProposals/actions';

import { BOOTSTRAP_APP_REQUEST } from '../../bootstrap/actions';
import { AUTH_LOG_IN_SUCCESS } from '../../auth/actions';
import { PROPOSALS_NEW_SUCCESS, PROPOSAL_COMPLETE_SUCCESS } from '../../proposals/actions';


export function* getPendingProposalsCountSaga(action: any) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);    
    const result: AxiosResponse<IProposalsListResponse> = yield call(backendApi.getPendingProposalsCount);
    
    yield put(getPendingProposalsCountSuccessAction(result.data.meta.total));
  } catch (e) {
    yield put(getPendingProposalsCountFailureAction(e));
  }
}

export function* watchGetPendingProposalsCount() {
  yield takeLatest(
    [
      GET_PENDING_PROPOSALS_COUNT_REQUEST,
      BOOTSTRAP_APP_REQUEST,
      AUTH_LOG_IN_SUCCESS,
      PROPOSALS_NEW_SUCCESS,
      PROPOSAL_COMPLETE_SUCCESS
    ],
    getPendingProposalsCountSaga
  );
}
