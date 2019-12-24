import { call, takeLatest, select, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { makeBackendApi, IProposalsListResponse } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import { proposalsListQuerySelector } from '../selectors';
import {
  GET_PROPOSAL_LIST_REQUEST,
  SET_FILTER,
  SET_SORT,
  SET_PAGE_NUMBER,
  getProposalListSuccessAction,
  getProposalListFailureAction,
} from '../actions';

export function* getProposalsListSaga(action: any) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const query = yield select(proposalsListQuerySelector);
    const result: AxiosResponse<IProposalsListResponse> = yield call(backendApi.getProposalsList, query);
    yield put(getProposalListSuccessAction(result.data.data, result.data.meta.total));
  } catch (e) {
    yield put(getProposalListFailureAction(e));
  }
}

export function* watchGetProposalsList() {
  yield takeLatest([GET_PROPOSAL_LIST_REQUEST, SET_FILTER, SET_SORT, SET_PAGE_NUMBER], getProposalsListSaga);
}
