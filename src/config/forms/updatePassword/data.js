import { FORBIDDEN, UNAUTHORIZED } from 'http-status';

import i18n from 'config/i18n';

export default {
  titles: {
    default: i18n.t('form.titles.signIn'),
  },
  errors: {
    default: i18n.t('content.login.error.unknown'),
    [FORBIDDEN]: i18n.t('content.login.error.unverified'),
    [UNAUTHORIZED]: i18n.t('content.login.error.unauthorized'),
  },
};
