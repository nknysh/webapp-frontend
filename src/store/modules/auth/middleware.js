import { isEmpty, match, propOr, path } from 'ramda';
import { logOut } from './actions';

const authMiddleware = ({ getState }) => next => ({ type, payload }) => {
  if (type && !isEmpty(match(/_ERROR/g, type))) {
    const status = propOr(path(['response', 'status'], payload), 'status', payload);

    if (status === 401) {
      logOut()(next, getState);
    }
  }

  next({ type, payload });
};

export default authMiddleware;
