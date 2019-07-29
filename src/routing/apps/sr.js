import { auth, page, notFound, search, hotels, booking, proposals } from 'routing/common';

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
