export default {
  email: {
    label: 'Email Address',
    default: '',
  },
  password: {
    label: 'Password',
    default: '',
    props: {
      type: 'password',
    },
  },
  rememberMe: {
    label: 'Remember me',
    default: false,
  },
};
