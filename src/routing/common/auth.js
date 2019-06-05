import { AsyncCreateAccount, AsyncLogin, AsyncLogout, AsyncSetPassword, AsyncPasswordReset } from 'pages/async';

export default [
  {
    name: 'Login',
    path: '/login',
    component: AsyncLogin,
  },
  {
    name: 'Logout',
    path: '/logout',
    component: AsyncLogout,
    auth: true,
    ignore: true,
  },
  {
    name: 'Create Account',
    path: '/sign-up',
    component: AsyncCreateAccount,
  },
  {
    name: 'Password Reset',
    path: '/password-reset',
    exact: true,
    component: AsyncPasswordReset,
  },
  {
    name: 'Password Reset',
    path: '/password-reset/:token',
    exact: true,
    component: AsyncSetPassword,
  },
];
