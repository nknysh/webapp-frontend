import React from 'react';
import { Select, Checkbox } from '@pure-escapes/webapp-ui-components';

import i18n from '../../i18n';

export default {
  proposalId: {
    default: '',
    label: i18n.t('labels.proposalId'),
    Component: Select,
    props: {
      options: [{ new: <b>{i18n.t('labels.newProposal')}</b> }],
    },
  },
  proposalName: {
    default: '',
    label: i18n.t('labels.proposalName'),
  },
  placeHolds: {
    Component: Checkbox,
    default: false,
    props: {
      label: i18n.t('labels.takeAHold'),
    },
  },
};
