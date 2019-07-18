import i18n from 'config/i18n';

export default {
  password: {
    label: i18n.t('labels.password'),
    default: '',
    props: {
      type: 'password',
    },
  },
  passwordConfirm: {
    label: i18n.t('labels.repeatPassword'),
    default: '',
    props: {
      type: 'password',
    },
  },
};
