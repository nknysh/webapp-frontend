import { auth, page, notFound, search, proposals, booking, user, hotels } from 'routing/common';
import { AsyncHomeAuthenticated, AsyncHome } from 'pages/async';

export default [
  {
    name: 'Root Path',
    path: '/',
    exact: true,
    component: AsyncHomeAuthenticated,
    auth: true,
    authComponent: AsyncHome,
    authCheckIgnore: true,
  },

  // Order is important here
  ...auth,
  ...search,
  ...hotels,
  ...proposals,
  ...booking,
  ...user,

  // Page is a catch all /:path
  ...page,
  ...notFound,
];
