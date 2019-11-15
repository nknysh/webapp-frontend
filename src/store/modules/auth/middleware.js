import { isEmpty, match, propOr, path, equals } from 'ramda';
import { UNAUTHORIZED } from 'http-status';

import { logOut, AUTH_CHECK } from './actions';

const authMiddleware = ({ getState }) => next => action => {
  const { type, payload } = action;
  // If there is a type and that type is AUTH_CHECK and an action has been dispatched with '_ERROR'
  if (type && !equals(AUTH_CHECK, type) && !isEmpty(match(/_ERROR/g, type))) {
    const status = propOr(path(['response', 'status'], payload), 'status', payload);

    // Unauthorized means we need to logout
    if (equals(UNAUTHORIZED, status)) {
      logOut()(next, getState);
    }
  }

  next(action);
};

export default authMiddleware;
