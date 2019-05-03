import { isEmpty, match, propOr, path, equals } from 'ramda';
import { UNAUTHORIZED } from 'http-status';

import { logOut } from './actions';

const authMiddleware = ({ getState }) => next => ({ type, payload }) => {
  if (type && !isEmpty(match(/_ERROR/g, type))) {
    const status = propOr(path(['response', 'status'], payload), 'status', payload);

    if (equals(UNAUTHORIZED, status)) {
      logOut()(next, getState);
    }
  }

  next({ type, payload });
};

export default authMiddleware;
