import React from 'react';
import { propOr, compose } from 'ramda';
import connect from './withNotifications.state';

const withNotifications = WrappedComponent => {
  const ConnectedWrappedComponent = compose(connect)(WrappedComponent);

  const wrappedDisplayName = propOr(propOr('Component', 'name', WrappedComponent), 'displayName', WrappedComponent);

  const withNotifications = props => <ConnectedWrappedComponent {...props} />;
  withNotifications.displayName = `withNotifications(${wrappedDisplayName})`;

  return withNotifications;
};

export default withNotifications;
