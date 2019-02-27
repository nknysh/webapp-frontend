import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Loader } from 'components';
import { NotFound } from 'pages';
import { withAuthentication, propTypes as withAuthPropTypes } from 'hoc/withAuthentication';

const renderLoadingMessage = () => <Loader title="Authenticating..." />;

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

const renderRoute = (Component, props) => (Component && <Component {...props} />) || <Route component={NotFound} />;

export const AuthenticatedRoute = ({ auth, isAuthLoading, isAuthenticated, location, authRedirect, ...props }) => {
  const notAuthenticated = auth && !isAuthenticated;

  if (isAuthLoading) {
    return renderLoadingMessage();
  }

  const routeProps = { location, ...props };

  if (notAuthenticated && authRedirect) {
    return renderRoute(authRedirect, routeProps);
  }

  if (notAuthenticated) {
    return renderRedirect(location);
  }

  return renderRoute(Route, routeProps);
};

AuthenticatedRoute.propTypes = {
  ...withAuthPropTypes,
};

export default compose(
  withAuthentication,
  withRouter
)(AuthenticatedRoute);
