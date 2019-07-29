import { AsyncUser } from 'pages/async';

export default [
  {
    name: 'User',
    path: '/settings/:section?',
    component: AsyncUser,
    auth: true,
  },
];
