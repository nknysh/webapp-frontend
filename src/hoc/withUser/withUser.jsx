import React from 'react';
import { propOr, compose } from 'ramda';

import connect from './withUser.state';

const withUser = WrappedComponent => {
  const ConnectedWrappedComponent = compose(connect)(WrappedComponent);

  const wrappedDisplayName = propOr(propOr('Component', 'name', WrappedComponent), 'displayName', WrappedComponent);

  const WithUser = props => <ConnectedWrappedComponent {...props} />;
  WithUser.displayName = `withUser(${wrappedDisplayName})`;

  return WithUser;
};

export default withUser;
