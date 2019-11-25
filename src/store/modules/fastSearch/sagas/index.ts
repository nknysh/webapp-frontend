import { all, spawn, call } from 'redux-saga/effects';
import { watchOffersSearchRequest } from './offersSearchSaga';
import { watchOptionsRequest } from './searchOptionsSaga';
import { watchTransferUpdate } from './updateBookingBuilderResponse';
import { watchDestinationChange } from './nameSearchSaga';
import { watchInitializeQuery } from './initializeQuerySaga';

export default function* searchSagas() {
  const sagas = [
    watchOffersSearchRequest,
    watchOptionsRequest,
    watchDestinationChange,
    watchTransferUpdate,
    watchInitializeQuery,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
