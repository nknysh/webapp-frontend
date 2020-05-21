import { eventChannel } from 'redux-saga';
import { put, take, call } from 'redux-saga/effects';

import { CIRCLE_BUILD_NUM, CHECK_APP_VERSION_TIME_INTERVAL, CURR_DEPLOY_BASE_URL } from 'config';

import { setLatestAppVersion } from "../actions";

function checkAppVersionEventsGenerator(currVersion: string, interval: number = CHECK_APP_VERSION_TIME_INTERVAL) {
  return eventChannel(emitter => {
      const iv = setInterval(async () => {
        try {
          console.log('Fetching newest version...');
          const fetchResult = await fetch(CURR_DEPLOY_BASE_URL);
          console.log(fetchResult);
          // if request fails - we don't care alot (may be changed)
          if (fetchResult.status >= 200 && fetchResult.status < 300 && fetchResult.statusText === 'OK') {
            const newAppVersion = await fetchResult.text();
            // if prod version is different from ours - assume it's deprecated
            console.log(`Current version: ${currVersion}`);
            console.log(`Latest version: ${newAppVersion}`);
            const isAppDeprecated = newAppVersion !== currVersion;
            console.log('setting: ' + isAppDeprecated);
            // emit event only if new app version is released
            isAppDeprecated && emitter({ newAppVersion, isAppDeprecated })
          }
        } catch (e) {
          // TODO: ??
          console.warn(e)
        }
      }, interval);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }
  )
}

export function* watchVersionChangeSaga() {
  // 1- Create a generator for request actions
  const newAppVersionChannel = yield call(checkAppVersionEventsGenerator, CIRCLE_BUILD_NUM);
  // 2- take from the channel
  const {newAppVersion, isAppDeprecated} = yield take(newAppVersionChannel);
  // 3- check what is latest version
  yield put(setLatestAppVersion(newAppVersion, isAppDeprecated))
}
