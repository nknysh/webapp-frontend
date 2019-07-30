import { prop } from 'ramda';

import { Select, Checkbox } from 'components';
import i18n from 'config/i18n';

import formConfig from 'config/forms';

export default {
  title: {
    label: i18n.t('labels.titleOptional'),
    default: '',
    Component: Select,
    props: {
      options: prop('titles', formConfig),
    },
  },
  firstName: {
    label: i18n.t('labels.firstName'),
    default: '',
  },
  lastName: {
    label: i18n.t('labels.lastName'),
    default: '',
  },
  email: {
    label: i18n.t('labels.emailAddress'),
    default: '',
  },
  receiveEmailAlerts: {
    Component: Checkbox,
    default: false,
    props: {
      label: i18n.t('labels.receiveEmailAlerts'),
    },
  },
};
