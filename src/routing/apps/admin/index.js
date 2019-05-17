import React from 'react';
import { path } from 'ramda';

import uiConfig from 'config/ui';
import { Loader } from 'components/elements';

import auth from 'routing/common/auth';

import { ADMIN_BASE_URL } from 'config';

export default [
  ...auth,
  {
    name: 'Redirect to Admin',
    // eslint-disable-next-line react/display-name
    render: () => {
      ADMIN_BASE_URL && window && window.location.replace(ADMIN_BASE_URL);
      return <Loader text={path(['messages', 'redirecting'], uiConfig)} />;
    },
  },
];
