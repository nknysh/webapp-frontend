import React, { Fragment } from 'react';

import i18n from 'config/i18n';
import { Checkbox } from 'components/elements';

export default {
  agreeToTerms: {
    Component: Checkbox,
    props: {
      label: (
        <Fragment>
          {i18n.t('labels.concludeBooking')}
          <a href="/terms-and-conditions" target="_blank">
            {i18n.t('labels.termsAndConditions')}
          </a>
        </Fragment>
      ),
    },
    default: false,
  },
};
