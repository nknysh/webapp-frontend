import i18n from 'config/i18n';
import { TextArea } from '@pure-escapes/webapp-ui-components';

export default {
  overrideTotal: {
    label: i18n.t('labels.overrideTotal'),
    props: {
      placeholder: i18n.t('form.placeholders.overrideTotal'),
      type: 'number',
    },
  },
  bookingComments: {
    label: i18n.t('labels.bookingComments'),
    Component: TextArea,
  },
  internalComments: {
    label: i18n.t('labels.internalComments'),
    Component: TextArea,
  },
};
