import auth from 'routing/common/auth';

import { ADMIN_BASE_URL } from 'config';

export default [
  ...auth,
  {
    name: 'Redirect to Admin',
    render: () => {
      ADMIN_BASE_URL && window && window.location.replace(ADMIN_BASE_URL);
      return null;
    },
  },
];
