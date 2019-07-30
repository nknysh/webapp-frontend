import React from 'react';

import i18n from 'config/i18n';
import { Loader } from 'components/elements';

import { auth, booking, proposals, user } from 'routing/common';

import { ADMIN_BASE_URL } from 'config';

export default [
  ...auth,
  ...booking,
  ...proposals,
  ...user,

  {
    name: 'Redirect to Admin',
    // eslint-disable-next-line react/display-name
    render: () => {
      ADMIN_BASE_URL && window && window.location.replace(ADMIN_BASE_URL);
      return <Loader text={i18n.t('messages.redirecting')} />;
    },
  },
];
