import { prop } from 'ramda';

import { AUTH_SET_TOKEN, authOk } from 'store/modules/auth/actions';

import mockUser from 'config/auth/mockUser';

const isDev = process.env.NODE_ENV === 'development';

const getActionType = prop('type');
const getActionPayload = prop('payload');
/**
 * @todo This should be removed asap.
 *       This allows to intercept auth actions in order
 *       to mock responses from the actions that trigger
 *       API calls.
 */
export default () => next => action => {
  // Don't do anything unless we are in dev
  if (!isDev) return next(action);

  if (getActionType(action) === AUTH_SET_TOKEN) {
    const { token } = getActionPayload(action);
    // Mock a user after a token has been set to state
    next(action);
    token && next(authOk({ ...getActionPayload(action), user: mockUser }));
    return;
  }

  next(action);
};
