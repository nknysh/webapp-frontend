import { map } from 'ramda';

import { isFunction } from 'utils';

import integrations from './integrations';

const trackingMiddleware = ({ getState }) => next => action => {
  const state = getState();

  map(integration => isFunction(integration) && integration(state, action), integrations);

  next(action);
};

export default trackingMiddleware;
