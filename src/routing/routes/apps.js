import { App } from 'apps/App';
import { NotFound } from 'pages';

export default [
  {
    path: '/admin',
    exact: true,
    component: NotFound,
  },
  {
    path: '/',
    component: App,
  },
];
