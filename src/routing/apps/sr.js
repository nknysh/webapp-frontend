import { auth, page, notFound, search, hotels, booking, proposals, user } from 'routing/common';

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
  ...proposals,
  ...booking,
  ...user,

  ...page,
  ...notFound,
];
