import { CreateAccount, Login, ResetPassword, SetPassword } from 'pages';

export default [
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  // {
  //   name: 'Reset Password',
  //   path: '/password/reset',
  //   component: ResetPassword,
  // },
  // {
  //   name: 'Set Password',
  //   path: '/password/new',
  //   component: SetPassword,
  // },
  {
    name: 'Create Account',
    path: '/sign-up',
    component: CreateAccount,
  },
];
