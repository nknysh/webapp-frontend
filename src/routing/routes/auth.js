import { CreateAccount, Login } from 'pages';

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
];
