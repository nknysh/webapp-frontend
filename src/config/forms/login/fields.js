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
  remember: {
    label: 'Remember me',
    default: false,
  },
};
