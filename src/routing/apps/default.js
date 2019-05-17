import auth from 'routing/common/auth';
import page from 'routing/common/page';
import notFound from 'routing/common/notFound';
import search from 'routing/common/search';
import hotels from 'routing/common/hotels';

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
  ...search,
  ...hotels,
  ...auth,
  ...page,
  ...notFound,
];
