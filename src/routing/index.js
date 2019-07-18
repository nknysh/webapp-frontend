import React, { Suspense } from 'react';
import { pathOr, path, pick, curry, map, has, cond, T, both, propOr, omit, pipe, mergeDeepRight } from 'ramda';
import { Route, Redirect } from 'react-router-dom';
import hash from 'object-hash';

import { AuthenticatedRoute } from 'containers';
import { Loader } from 'components/elements';

import config from './config';

const isRedirect = both(has('from'), has('to'));
const requiresAuth = both(has('auth'), propOr(false, 'auth'));

const sanitizeRoute = omit(['location', 'match', 'history', 'route', 'getComponent']);
const getRouteHash = pipe(
  pick(['path']),
  hash
);

const renderComponentWithRoute = curry((RouteComponent, { component: Component, ...route }) => (
  <RouteComponent
    key={getRouteHash(route)}
    render={props => (
      <Suspense fallback={<Loader />}>
        <Component {...mergeDeepRight(props, sanitizeRoute(route))} />
      </Suspense>
    )}
    {...sanitizeRoute(route)}
  />
));

const renderComponentWithRouteProps = curry((Component, route) => (
  <Route
    key={getRouteHash(route)}
    render={props => (
      <Suspense fallback={<Loader />}>
        <Component {...mergeDeepRight(props, sanitizeRoute(route))} />
      </Suspense>
    )}
    {...omit(['component'], sanitizeRoute(route))}
  />
));

const getRoute = renderComponentWithRoute(Route);
const getAuthRoute = renderComponentWithRouteProps(AuthenticatedRoute);
const getRedirect = renderComponentWithRoute(Redirect);

const renderRoute = cond([[isRedirect, getRedirect], [requiresAuth, getAuthRoute], [T, getRoute]]);

export const getRoutes = map(renderRoute);

export const getAppRoutes = app => getRoutes(pathOr(path(['apps', 'default'], config), ['apps', app], config));
