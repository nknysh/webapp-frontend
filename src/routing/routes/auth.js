import { CreateUser, Login, ResetPassword, SetPassword } from 'pages';

export default [
  {
    name: 'Login Path',
    path: '/login',
    component: Login,
  },
  {
    name: 'Reset Password Path',
    path: '/password/reset',
    component: ResetPassword,
  },
  {
    name: 'Set Password Path',
    path: '/password/new',
    component: SetPassword,
  },
  {
    name: 'Create User Path',
    path: '/sign-up',
    component: CreateUser,
  },
];
