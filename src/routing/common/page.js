import { AsyncContentPage } from 'pages/ContentPage';

export default [
  {
    name: 'Content Pages',
    exact: true,
    path: '/:pageId',
    component: AsyncContentPage,
  },
];
