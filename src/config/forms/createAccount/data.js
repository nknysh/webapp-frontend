import { CONFLICT } from 'http-status';

import i18n from 'config/i18n';

export default {
  titles: {
    default: i18n.t('form.titles.createAccount'),
    complete: i18n.t('form.titles.createAccountComplete'),
  },
  content: {
    info: i18n.t('content.createAccount.info'),
    complete: i18n.t('content.createAccount.complete'),
  },
  errors: {
    default: i18n.t('content.createAccount.error.unknown'),
    [CONFLICT]: i18n.t('content.createAccount.error.exists'),
  },
};
