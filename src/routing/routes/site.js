import { Home, HomeAuthenticated, NotFound } from 'pages';

export default [
  {
    name: 'Root Path',
    path: '/',
    exact: true,
    component: HomeAuthenticated,
    auth: true,
    authComponent: Home,
  },
  {
    name: 'Messages',
    path: '/messages',
    component: NotFound,
    auth: true,
    authRedirect: '/login',
  },
  {
    name: 'Proposals',
    path: '/proposals',
    component: NotFound,
    auth: true,
    authRedirect: '/login',
  },
  {
    name: 'Bookings',
    path: '/bookings',
    component: NotFound,
    auth: true,
    authRedirect: '/login',
  },
  {
    name: 'Holds',
    path: '/holds',
    component: NotFound,
    auth: true,
    authRedirect: '/login',
  },
  {
    name: 'Search',
    path: '/search',
    component: NotFound,
    auth: true,
    authRedirect: '/login',
  },
  {
    name: 'Calendar',
    path: '/calendar',
    component: NotFound,
    auth: true,
    authRedirect: '/login',
  },
];
