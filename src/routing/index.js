import React from 'react';
import { pick, curry, map, has, cond, T, both, propOr, omit, pipe, merge } from 'ramda';
import { Route, Redirect } from 'react-router-dom';
import hash from 'object-hash';

import { AuthenticatedRoute } from 'containers/AuthenticatedRoute';

const isRedirect = both(has('from'), has('to'));
const requiresAuth = both(has('auth'), propOr(false, 'auth'));

const sanitizeRoute = omit(['location', 'match', 'history', 'route', 'getComponent']);
const getRouteHash = pipe(
  pick(['path']),
  hash
);

const renderComponentWithRoute = curry((Component, route) => (
  <Component key={getRouteHash(route)} {...sanitizeRoute(route)} />
));

const renderComponentWithRouteProps = curry((Component, route) => (
  <Route
    key={getRouteHash(route)}
    {...omit(['component'], sanitizeRoute(route))}
    render={props => <Component {...merge(props, sanitizeRoute(route))} />}
  />
));

const getRoute = renderComponentWithRoute(Route);
const getAuthRoute = renderComponentWithRouteProps(AuthenticatedRoute);
const getRedirect = renderComponentWithRoute(Redirect);

const renderRoute = cond([[isRedirect, getRedirect], [requiresAuth, getAuthRoute], [T, getRoute]]);

const getRoutes = map(renderRoute);

export default getRoutes;
