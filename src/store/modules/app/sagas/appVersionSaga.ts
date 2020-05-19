import * as pj from '../../../../../package.json';

import { eventChannel } from 'redux-saga';
import { put, take, call } from 'redux-saga/effects';


import { setLatestAppVersion } from "../actions";

function checkAppVersionEventsGenerator(currVersion: string, TIME_INTERVAL: number = 5000) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        emitter(currVersion)
      }, TIME_INTERVAL);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }
  )
}


export function* checkAppVersionSaga(currAppVersion: string) {
  try {
    //TODO: fetch real data
    console.log('Fetching newest version...');
    const newAppVersion = yield '1.0.1';
    // if prod version is different from ours - assume it's deprecated
    console.log(`Current version: ${currAppVersion}`);
    console.log(`Latest version: ${newAppVersion}`);
    const isAppDeprecated = newAppVersion !== currAppVersion;
    console.log('setting: ' + isAppDeprecated);

    yield put(setLatestAppVersion(newAppVersion, isAppDeprecated))

  } catch (e) {
    // TODO: ??
    console.log(e)
  }
}

export function* watchVersionChangeSaga() {
  const currAppVersion = pj.version;
  // 1- Create a generator for request actions
  const requestChan = yield call(checkAppVersionEventsGenerator, currAppVersion);
  while (true) {
    // 2- take from the channel
    const currAppVersion = yield take(requestChan);
    // 3- check what is latest version
    yield call(checkAppVersionSaga, currAppVersion)
  }
}
