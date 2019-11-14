import { all, spawn, call } from 'redux-saga/effects';
import { watchOffersSearchRequest } from './offersSearchSaga';
import { watchOptionsRequest } from './searchOptionsSaga';

export default function* searchSagas() {
  const sagas = [watchOffersSearchRequest, watchOptionsRequest];
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
