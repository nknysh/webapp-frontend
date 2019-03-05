import { CreateAccount, Login, Home, PasswordReset } from 'pages';

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
    component: Home,
    auth: true,
    authRedirect: PasswordReset,
  },
];
