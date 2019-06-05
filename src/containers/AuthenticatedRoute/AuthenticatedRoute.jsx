import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose, prop } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Loader } from 'components';
import { AsyncNotFound } from 'pages/NotFound';
import { withAuthentication } from 'hoc';

import { propTypes, defaultProps } from './AuthenticatedRoute.props';

const renderLoadingMessage = t => <Loader title={t('messages.authenticating')} />;

const renderRedirect = ({ pathname, search }, props, path = '/login') => {
  const returnPath = prop('ignore', props) ? '' : `?origin=${encodeURIComponent(`${pathname}${search}`)}`;
  return <Redirect to={`${path}${returnPath}`} />;
};

const renderRoute = (Component, props) =>
  (Component && <Component {...props} />) || <Route component={AsyncNotFound} />;

export const AuthenticatedRoute = ({
  auth,
  isAuthLoading,
  isAuthenticated,
  location,
  authRedirect,
  authComponent,
  ...props
}) => {
  const { t } = useTranslation();

  const routeIsAuthenticated = auth && isAuthenticated;

  if (isAuthLoading) {
    return renderLoadingMessage(t);
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
