import React, { useState, useMemo } from 'react';
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
  // Flag to say we have checked the route fully
  const [checked, setChecked] = useState(false);
  const [prevLocation, setPrevLocation] = useState(getLocationProps(location));

  useEffectBoundary(() => {
    // Prop check here to see if location has changed
    const locationChange = !equals(getLocationProps(location), prevLocation);
    locationChange && setPrevLocation(getLocationProps(location));
    locationChange && setChecked(false);
  }, [location]);

  useEffectBoundary(() => {
    setChecked(true);
  }, [isAuthSuccess]);

  const routeIsAuthenticated = auth && isAuthenticated;
  const ignoreCheck = !isAuthenticated && authCheckIgnore;

  // Do a `/me` check
  useFetchData(authStatus, authCheck, [], [], auth, !(auth && !ignoreCheck));

  const routeProps = useMemo(() => ({ location, ...props }), [location, props]);

  if (auth && !checked) {
    return renderLoadingMessage(t);
  }

  // Route is authenticated, user isn't, auth component present. Render auth component
  if (!routeIsAuthenticated && authComponent) {
    return renderRoute(authComponent, routeProps);
  }

  // Route is authenticated and there is an authRedirect
  if (!routeIsAuthenticated && authRedirect) {
    return renderRedirect(location, routeProps, authRedirect);
  }

  // Route is auth but the user isn't authenticated
  if (!routeIsAuthenticated) {
    return renderRedirect(location, routeProps);
  }

  // Render route as normal
  return renderRouteComponent(routeProps);
};

AuthenticatedRoute.propTypes = propTypes;
AuthenticatedRoute.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  withRouter
)(AuthenticatedRoute);
