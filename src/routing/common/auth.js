import { AsyncCreateAccount } from 'pages/CreateAccount';
import { AsyncLogin } from 'pages/Login';
import { AsyncLogout } from 'pages/Logout';
import { AsyncSetPassword } from 'pages/SetPassword';
import { AsyncPasswordReset } from 'pages/PasswordReset';

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