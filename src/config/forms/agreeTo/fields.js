import React, { Fragment } from 'react';
import { Checkbox } from '@pure-escapes/webapp-ui-components';

import i18n from '../../i18n';

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
