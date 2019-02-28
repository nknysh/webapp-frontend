import { CreateAccount, Login, Home } from 'pages';

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
];
