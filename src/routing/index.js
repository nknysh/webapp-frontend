import React, { Suspense } from 'react';
import { pathOr, path, pick, curry, map, has, cond, T, both, propOr, omit, pipe, mergeDeepRight } from 'ramda';
import { Route, Redirect } from 'react-router-dom';
import hash from 'object-hash';
import { Loader } from '@pure-escapes/webapp-ui-components';

import { AuthenticatedRoute } from 'containers';

import config from './config';

/**
 * Is redirect
 *
 * Route is a redirect when it has both `from` and `to`
 *
 * @param {object}
 * @returns {boolean}
 */
const isRedirect = both(has('from'), has('to'));

/**
 * Requires auth
 *
 * Route authenticated if it has an `auth` key and that key is true
 *
 * @param {object}
 * @returns {boolean}
 */
const requiresAuth = both(has('auth'), propOr(false, 'auth'));

/**
 * Sanitize route
 *
 * @param {object}
 * @returns {object}
 */
const sanitizeRoute = omit(['location', 'match', 'history', 'route', 'getComponent']);

/**
 * Get route hash
 *
 * Generates a route has from the routing object
 *
 * @param {object}
 * @returns {string}
 */
const getRouteHash = pipe(
  pick(['path']),
  hash
);

/**
 * Render component with route
 *
 * Curried function that renders out a routes component wrapped in `Suspense`
 * with a custom react router component
 *
 * @param {Component} RouteComponent
 * @param {object}
 * @returns {ReactNode}
 */
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

/**
 * Render component with route props
 *
 * Curried function similar to above but renders a `Route` component all the time
 *
 * @param {Component} Component
 * @param {object} route
 * @returns {ReactNode}
 */
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

/**
 * Get route
 *
 * Function that will render route with `Route` component
 *
 * @param {object}
 * @returns {ReactNode}
 */
const getRoute = renderComponentWithRoute(Route);

/**
 * Get auth route
 *
 * Function that will render route with `AuthenticatedRoute` component
 *
 * @param {object}
 * @returns {ReactNode}
 */
const getAuthRoute = renderComponentWithRouteProps(AuthenticatedRoute);

/**
 * Get redirect
 *
 * Function that will render route with `Redirect` component
 *
 * @param {object}
 * @returns {ReactNode}
 */
const getRedirect = renderComponentWithRoute(Redirect);

/**
 * Render route
 *
 * Function that decides what type of route to render based on config
 *
 * @param {object}
 * @returns {ReactNode}
 */
const renderRoute = cond([[isRedirect, getRedirect], [requiresAuth, getAuthRoute], [T, getRoute]]);

/**
 * Get routes
 *
 * @param {Array}
 * @returns {Array<ReactNode>}
 */
export const getRoutes = map(renderRoute);

/**
 * Get app routes
 *
 * Builds routes depending on what app (in this case role) is supplied
 *
 * @param {string} app
 * @returns {Array<ReactNode>}
 */
export const getAppRoutes = app => getRoutes(pathOr(path(['apps', 'default'], config), ['apps', app], config));
