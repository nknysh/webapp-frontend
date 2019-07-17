import React from 'react';

import i18n from 'config/i18n';

import { Select, Checkbox } from 'components/elements';

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
