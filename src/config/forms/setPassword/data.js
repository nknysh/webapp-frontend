import { UNAUTHORIZED } from 'http-status';

import i18n from 'config/i18n';

export default {
  titles: {
    default: i18n.t('form.titles.setPassword'),
    complete: i18n.t('form.titles.setPasswordComplete'),
  },
  errors: {
    default: i18n.t('content.setPassword.error.unknown'),
    [UNAUTHORIZED]: i18n.t('content.setPassword.error.expired'),
  },
};
