import { CreateAccount, Home } from 'pages';

export default [
  {
    name: 'Create Account',
    path: '/sign-up',
    component: Home,
    auth: true,
    authRedirect: CreateAccount,
  },
];
