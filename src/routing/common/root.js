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
];
