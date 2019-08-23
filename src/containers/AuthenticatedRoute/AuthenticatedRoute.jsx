import React, { useState } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose, prop, equals } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Loader } from '@pure-escapes/webapp-ui-components';

import { useFetchData, useEffectBoundary } from 'effects';
import NotFound from 'pages/NotFound';
import { withAuthentication } from 'hoc';

import { propTypes, defaultProps } from './AuthenticatedRoute.props';

const getLocationProps = prop('pathname');

const renderLoadingMessage = t => <Loader title={t('messages.authenticating')} />;

const renderRedirect = ({ pathname, search }, props, path = '/login') => {
  const returnPath = prop('ignore', props) ? '' : `?origin=${encodeURIComponent(`${pathname}${search}`)}`;
  return <Redirect to={`${path}${returnPath}`} />;
};

const renderRoute = (Component, props) => (Component && <Component {...props} />) || <Route component={NotFound} />;

const renderRouteComponent = ({ component: Component, ...props }) =>
  Component && <Route render={routeProps => <Component {...routeProps} />} {...props} />;

export const AuthenticatedRoute = ({
  auth,
  authCheck,
  authCheckIgnore,
  authComponent,
  authRedirect,
  authStatus,
  isAuthenticated,
  isAuthSuccess,
  location,
  ...props
}) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [prevLocation, setPrevLocation] = useState(getLocationProps(location));

  useEffectBoundary(() => {
    const locationChange = !equals(getLocationProps(location), prevLocation);
    locationChange && setPrevLocation(getLocationProps(location));
    locationChange && setChecked(false);
  }, [location]);

  useEffectBoundary(() => {
    setChecked(true);
  }, [isAuthSuccess]);

  const routeIsAuthenticated = auth && isAuthenticated;
  const ignoreCheck = !isAuthenticated && authCheckIgnore;

  useFetchData(authStatus, authCheck, [], [], auth, !(auth && !ignoreCheck));

  if (auth && !checked) {
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

  return renderRouteComponent(routeProps);
};

AuthenticatedRoute.propTypes = propTypes;
AuthenticatedRoute.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  withRouter
)(AuthenticatedRoute);
