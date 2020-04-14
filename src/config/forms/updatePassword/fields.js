import i18n from '../../i18n';

export default {
  currentPassword: {
    label: i18n.t('labels.currentPassword'),
    default: '',
    props: {
      type: 'password',
    },
  },
  newPassword: {
    label: i18n.t('labels.password'),
    default: '',
    props: {
      type: 'password',
    },
  },
  newPasswordConfirm: {
    label: i18n.t('labels.repeatPassword'),
    default: '',
    props: {
      type: 'password',
    },
  },
};
