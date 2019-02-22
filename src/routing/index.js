import React from 'react';
import { curry, map, has, cond, T, both, propOr, omit } from 'ramda';
import { Route, Redirect } from 'react-router-dom';
import hash from 'object-hash';

import { AuthenticatedRoute } from 'containers/AuthenticatedRoute';

import routes from './routes';

const isRedirect = both(has('from'), has('to'));
const requiresAuth = both(has('auth'), propOr(false, 'auth'));

const sanitizeRoute = omit(['auth', 'route', 'getComponent']);

const renderRouteComponent = curry((Component, route) => <Component key={hash(omit(['component'], route))} {...sanitizeRoute(route)} />);

const getRoute = renderRouteComponent(Route);
const getAuthRoute = renderRouteComponent(AuthenticatedRoute);
const getRedirect = renderRouteComponent(Redirect);

const renderRoute = cond([[isRedirect, getRedirect], [requiresAuth, getAuthRoute], [T, getRoute]]);

const getRoutes = map(renderRoute);

export default getRoutes(routes);
