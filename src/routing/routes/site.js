import { AsyncHome } from 'pages/Home';
import { AsyncHomeAuthenticated } from 'pages/HomeAuthenticated';
import { AsyncNotFound } from 'pages/NotFound';

export default [
  {
    name: 'Root Path',
    path: '/',
    exact: true,
    component: AsyncHomeAuthenticated,
    auth: true,
    authComponent: AsyncHome,
  },
  {
    name: 'Messages',
    path: '/messages',
    component: AsyncNotFound,
    auth: true,
    authRedirect: '/login',
  },
  {
    name: 'Proposals',
    path: '/proposals',
    component: AsyncNotFound,
    auth: true,
    authRedirect: '/login',
  },
  {
    name: 'Bookings',
    path: '/bookings',
    component: AsyncNotFound,
    auth: true,
    authRedirect: '/login',
  },
  {
    name: 'Holds',
    path: '/holds',
    component: AsyncNotFound,
    auth: true,
    authRedirect: '/login',
  },
  {
    name: 'Calendar',
    path: '/calendar',
    component: AsyncNotFound,
    auth: true,
    authRedirect: '/login',
  },
];
