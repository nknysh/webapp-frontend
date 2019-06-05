import auth from 'routing/common/auth';
import page from 'routing/common/page';
import notFound from 'routing/common/notFound';
import search from 'routing/common/search';
import hotels from 'routing/common/hotels';
import proposals from 'routing/common/proposals';
import booking from 'routing/common/booking';

import { AsyncHomeAuthenticated, AsyncHome } from 'pages/async';

export default [
  {
    name: 'Root Path',
    path: '/',
    exact: true,
    component: AsyncHomeAuthenticated,
    auth: true,
    authComponent: AsyncHome,
  },

  // Order is important here
  ...auth,
  ...search,
  ...hotels,
  ...proposals,
  ...booking,

  // Page is a catch all /:path
  ...page,
  ...notFound,
];
