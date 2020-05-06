import { takeLatest, put } from 'redux-saga/effects';
import { PROPOSALS_NEW, PROPOSALS_ADD } from '../../proposals/actions';
import { setLatestBookingOperationAction } from '../actions';

export function* latestBookingOperationSaga(action: any) {
  yield put(setLatestBookingOperationAction(action.type));
}

export function* watchBookingOperations() {
  yield takeLatest(
    [
      PROPOSALS_NEW,
      PROPOSALS_ADD
    ],
    latestBookingOperationSaga
  );
}
