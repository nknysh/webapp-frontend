import i18n from 'config/i18n';

export default {
  email: {
    label: i18n.t('labels.emailAddress'),
    default: '',
  },
  password: {
    label: i18n.t('labels.password'),
    default: '',
    props: {
      type: 'password',
    },
  },
  rememberMe: {
    label: i18n.t('labels.rememberMe'),
    default: false,
  },
};
