import React from 'react';
import { Loader } from '@pure-escapes/webapp-ui-components';

import i18n from 'config/i18n';

import { ADMIN_BASE_URL } from 'config';

export const AdminRedirect = () => {
  ADMIN_BASE_URL && window && window.location.replace(ADMIN_BASE_URL);
  return <Loader text={i18n.t('messages.redirecting')} />;
};

export default AdminRedirect;
