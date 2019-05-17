import auth from 'routing/common/auth';
import page from 'routing/common/page';
import notFound from 'routing/common/notFound';

import { AsyncDashboard } from 'pages/Dashboard';

export default [
  {
    name: 'Root Path',
    path: '/',
    exact: true,
    component: AsyncDashboard,
  },
  ...auth,
  ...page,
  ...notFound,
];
