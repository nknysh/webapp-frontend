import React from 'react';
import { propOr, compose } from 'ramda';
import connect from './withAuthentication.state';

const withAuthentication = WrappedComponent => {
  const ConnectedWrappedComponent = compose(connect)(WrappedComponent);

  const wrappedDisplayName = propOr(propOr('Component', 'name', WrappedComponent), 'displayName', WrappedComponent);

  const WithAuthentication = props => <ConnectedWrappedComponent {...props} />;
  WithAuthentication.displayName = `withAuthentication(${wrappedDisplayName})`;

  return WithAuthentication;
};

export default withAuthentication;
