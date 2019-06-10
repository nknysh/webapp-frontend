import { AsyncContentPage } from 'pages/async';

export default [
  {
    name: 'Content Pages',
    exact: true,
    path: '/:pageId',
    component: AsyncContentPage,
  },
];
