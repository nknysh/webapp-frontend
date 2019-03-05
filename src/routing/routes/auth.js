import { CreateAccount, Login, Home, PasswordReset, SetPassword } from 'pages';

export default [
  {
    name: 'Login',
    path: '/login',
    component: Home,
    auth: true,
    authRedirect: Login,
  },
  {
    name: 'Create Account',
    path: '/sign-up',
    component: Home,
    auth: true,
    authRedirect: CreateAccount,
  },
  {
    name: 'Password Reset',
    path: '/password-reset',
    exact: true,
    component: Home,
    auth: true,
    authRedirect: PasswordReset,
  },
  {
    name: 'Password Reset',
    path: '/password-reset/:token',
    exact: true,
    component: Home,
    auth: true,
    authRedirect: SetPassword,
  },
];
