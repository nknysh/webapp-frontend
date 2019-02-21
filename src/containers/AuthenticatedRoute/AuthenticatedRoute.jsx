import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { withAuthentication, propTypes as withAuthPropTypes } from 'hoc/withAuthentication';

const renderLoadingMessage = () => <p>Authenticating...</p>;

const renderRedirect = location => (
  <Redirect
    to={{
      pathname: '/login',
      state: {
        from: location,
      },
    }}
  />
);

export const AuthenticatedRoute = props => {
  const { isAuthLoading, isAuthenticated, location, ...rest } = props;

  if (isAuthLoading) {
    return renderLoadingMessage();
  }

  if (!isAuthenticated) {
    return renderRedirect(location);
  }

  return <Route {...rest} />;
};

AuthenticatedRoute.propTypes = {
  ...withAuthPropTypes,
};

export default compose(
  withAuthentication,
  withRouter
)(AuthenticatedRoute);
