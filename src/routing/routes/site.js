import { Home, Search, NotFound } from 'pages';

export default [
  {
    name: 'Root Path',
    path: '/',
    exact: true,
    component: Search,
    auth: true,
    authRedirect: Home,
  },
  {
    name: 'Messages',
    path: '/messages',
    component: NotFound,
    auth: true,
  },
  {
    name: 'Calendar',
    path: '/calendar',
    component: NotFound,
    auth: true,
  },
  {
    name: 'Proposals',
    path: '/proposals',
    component: NotFound,
    auth: true,
  },
  {
    name: 'Bookings',
    path: '/bookings',
    component: NotFound,
    auth: true,
  },
  {
    name: 'Holds',
    path: '/holds',
    component: NotFound,
    auth: true,
  },
];
