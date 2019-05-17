import React, { Suspense } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose, path, prop } from 'ramda';

import config from 'config/ui';
import { Loader } from 'components';
import { AsyncNotFound } from 'pages/NotFound';
import { withAuthentication } from 'hoc';

import { propTypes, defaultProps } from './AuthenticatedRoute.props';

export const routeRenderer = (Component, props) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

const renderLoadingMessage = () => <Loader title={path(['messages', 'authenticating'], config)} />;

// eslint-disable-next-line react/prop-types
const renderRedirect = ({ pathname, search }, props, path = '/login') => {
  const returnPath = prop('ignore', props) ? '' : `?origin=${encodeURIComponent(`${pathname}${search}`)}`;
  return <Redirect to={`${path}${returnPath}`} />;
};

const renderRoute = (Component, { component: RouteComponent, ...props }) =>
  (Component && <Component {...props} render={props => routeRenderer(RouteComponent, props)} />) || (
    <Route component={AsyncNotFound} />
  );

export const AuthenticatedRoute = ({
  auth,
  isAuthLoading,
  isAuthenticated,
  location,
  authRedirect,
  authComponent,
  ...props
}) => {
  const routeIsAuthenticated = auth && isAuthenticated;

  if (isAuthLoading) {
    return renderLoadingMessage();
  }

  const routeProps = { location, ...props };

  if (!routeIsAuthenticated && authComponent) {
    return renderRoute(authComponent, routeProps);
  }

  if (!routeIsAuthenticated && authRedirect) {
    return renderRedirect(location, routeProps, authRedirect);
  }

  if (!routeIsAuthenticated) {
    return renderRedirect(location, routeProps);
  }

  return renderRoute(Route, routeProps);
};

AuthenticatedRoute.propTypes = propTypes;
AuthenticatedRoute.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  withRouter
)(AuthenticatedRoute);
