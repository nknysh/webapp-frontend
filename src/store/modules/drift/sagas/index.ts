import { takeLatest, select } from 'redux-saga/effects';
import { pick } from 'ramda';
import { BOOTSTRAP_APP_SUCCESS } from '../../bootstrap/actions';
import { AUTH_LOG_IN_SUCCESS, AUTH_LOG_OUT_SUCCESS } from '../../auth/actions';
import { getCurrentUser } from '../../auth/selectors';
import { DRIFT_ENABLED_ROLES } from 'config';

const driftEnabled = (userType: string) => 
  DRIFT_ENABLED_ROLES.includes(userType) ||
  DRIFT_ENABLED_ROLES.includes('all');


function* handleAuthChange(action: any) {
  const user = yield select(getCurrentUser);
  const drift = (<any>window).drift;

  if(!drift){
    return;
  }
  
  if(user && driftEnabled(user.type)){
  
    const attrs = pick(
      ['email', 'title', 'firstName', 'lastName', 'phoneNumber', 'mobileNumber'],
      user
    );
  
    drift.identify(user.uuid, attrs);
    drift.show();
  
  } else {
    drift.hide();
    drift.reset();
  }
  
}

export default function*() {
  yield takeLatest(
    [
      BOOTSTRAP_APP_SUCCESS,
      AUTH_LOG_IN_SUCCESS,
      AUTH_LOG_OUT_SUCCESS
    ],
    handleAuthChange
  );
}