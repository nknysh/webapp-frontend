import auth from 'routing/common/auth';
import page from 'routing/common/page';
import notFound from 'routing/common/notFound';
import search from 'routing/common/search';
import hotels from 'routing/common/hotels';
import booking from 'routing/common/booking';
import proposals from 'routing/common/proposals';

import { AsyncDashboard } from 'pages/async';

export default [
  {
    name: 'Root Path',
    path: '/',
    exact: true,
    component: AsyncDashboard,
  },
  ...search,
  ...hotels,
  ...auth,
  ...page,
  ...proposals,
  ...booking,

  ...notFound,
];
