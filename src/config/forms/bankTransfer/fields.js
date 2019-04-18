import React, { Fragment } from 'react';

import { Checkbox } from 'components/elements';

export default {
  agreeToTerms: {
    Component: Checkbox,
    props: {
      label: (
        <Fragment>
          By concluding the booking process, I accept the{' '}
          <a href="/terms-and-conditions" target="_blank">
            Terms and Conditions
          </a>
        </Fragment>
      ),
    },
    default: false,
  },
};
