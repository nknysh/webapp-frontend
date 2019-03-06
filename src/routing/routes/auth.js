import { CreateAccount, Login, PasswordReset, SetPassword } from 'pages';

export default [
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Create Account',
    path: '/sign-up',
    component: CreateAccount,
  },
  {
    name: 'Password Reset',
    path: '/password-reset',
    exact: true,
    component: PasswordReset,
  },
  {
    name: 'Password Reset',
    path: '/password-reset/:token',
    exact: true,
    component: SetPassword,
  },
];
