import { eventChannel } from 'redux-saga';
import { put, take, call } from 'redux-saga/effects';

import { CIRCLE_BUILD_NUM } from 'config';


import { setLatestAppVersion } from "../actions";

const getCurrentDeployUrl = () => {
  //TODO
  return 'https://qa.pure-escapes.com/currVersion';
};

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
    console.log('Fetching newest version...');
    const currDeployURL = getCurrentDeployUrl();
    const fetchResult = yield call(fetch, currDeployURL);
    console.log(fetchResult);
    // if request fails - we don't care alot (may be changed)
    if (fetchResult.status === 200 && fetchResult.statusText === 'OK') {
      const newAppVersion = yield fetchResult.text();
      // if prod version is different from ours - assume it's deprecated
      console.log(`Current version: ${currAppVersion}`);
      console.log(`Latest version: ${newAppVersion}`);
      const isAppDeprecated = newAppVersion !== currAppVersion;
      console.log('setting: ' + isAppDeprecated);

      yield put(setLatestAppVersion(newAppVersion, isAppDeprecated))
    }
  } catch (e) {
    // TODO: ??
    console.log(e)
  }
}

export function* watchVersionChangeSaga() {
  // 1- Create a generator for request actions
  const requestChan = yield call(checkAppVersionEventsGenerator, CIRCLE_BUILD_NUM);
  while (true) {
    // 2- take from the channel
    const currAppVersion = yield take(requestChan);
    // 3- check what is latest version
    yield call(checkAppVersionSaga, currAppVersion)
  }
}
