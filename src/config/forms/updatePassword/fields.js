import i18n from 'config/i18n';

export default {
  currentPassword: {
    label: i18n.t('labels.currentPassword'),
    default: '',
    props: {
      type: 'password',
    },
  },
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
