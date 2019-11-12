# WAFE Routing

## NOTE: THIS IS ALL WRONG

The whole point of React Router is that you mount routes just like you'd mount a component, so your entire applicaiton is composable, declarative, and idiomatic React. A config based approach just confuses and complicates everything. However, this _is_ the way things work right now, so it's important to understand why things currently work the way they do.

## Structure

Routing in WAFE is split up into configuration files using [`react-router`](https://github.com/ReactTraining/react-router).

The following is the structure for routing:

```
routing/
    - apps/
    - common/
    - config.js
    - entry.js
    - index.js
```

### Apps

Apps in this context are actually the roles of a user generally they are combined list of common routes based on which routes should be available to that role e.g. for `admin`:

```js
import { auth, booking, proposals, user, adminRedirect } from 'routing/common';

export default [...auth, ...booking, ...proposals, ...user, ...adminRedirect];
```

### Common

Common routes are routes that can be shared across any app (role). Routing configuration should export a default array of routing config objects e.g.

```js
import { AsyncHotelBooking, AsyncHotel } from 'pages/async';

export default [
  {
    name: 'Hotel',
    path: '/hotels/:id',
    component: AsyncHotel,
    auth: true,
    exact: true,
  },
  {
    name: 'Hotel',
    path: '/hotels/:id/:stage/:complete?',
    component: AsyncHotelBooking,
    auth: true,
    exact: true,
  },
];
```

## `config.js`

This is a configuration of apps that can be supplied to the routing builder

```js
export default {
  apps: {
    someApp: [...routes],
    someOtherApp: [...routes],
  },
};
```

## `entry.js`

This is the route path that allows us to hit `/` and render the correct apps based on role

## `index.js`

Builds out the routes that are passed to the default export and returns an array of route nodes that can be rendered in any `react-router` instance.

## Routing config

```ts
{
    // Route name
    name: string,

    // Route path
    path: string,

    // Component to render if successful
    component: ReactNode,

    // Optional: Whether this route is authenticated
    auth: Boolean,

    // Optional: Render a component when a user is not authenticated
    authComponent: ReactNode,

    // Optional: redirect from
    from: string,

    // Optional: redirect to
    to: string,
}
```
