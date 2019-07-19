import { prop } from 'ramda';
import i18n from 'config/i18n';

import { Checkbox, Select, TextArea } from 'components/elements';

import formConfig from 'config/forms';

export default {
  guestTitle: {
    label: i18n.t('labels.titleOptional'),
    default: '',
    Component: Select,
    props: {
      options: prop('titles', formConfig),
    },
    section: i18n.t('labels.leadGuestInfo'),
  },
  guestFirstName: {
    label: 'First name',
    default: '',
    section: i18n.t('labels.leadGuestInfo'),
  },
  guestLastName: {
    label: 'Last name',
    default: '',
    section: i18n.t('labels.leadGuestInfo'),
  },
  isRepeatGuest: {
    Component: Checkbox,
    default: false,
    section: i18n.t('labels.leadGuestInfo'),
    props: {
      label: i18n.t('labels.fullRepeatGuest'),
    },
  },
  flightArrivalNumber: {
    default: '',
    label: i18n.t('labels.arrivalFlightNumber'),
    section: i18n.t('labels.flightInformation'),
  },
  flightDepartureNumber: {
    default: '',
    label: i18n.t('labels.departureFlightNumber'),
    section: i18n.t('labels.flightInformation'),
  },
  flightArrivalDate: {
    label: i18n.t('labels.arrivalDate'),
    default: undefined,
  },
  flightDepartureDate: {
    label: i18n.t('labels.departureDate'),
    default: undefined,
  },
  specialRequests: {
    cribCob: {
      Component: Checkbox,
      props: {
        label: i18n.t('labels.specialRequestOptions.cribCob'),
      },
      default: false,
    },
    bedGuard: {
      Component: Checkbox,
      props: {
        label: i18n.t('labels.specialRequestOptions.bedGuard'),
      },
      default: false,
    },
    adjacentRooms: {
      Component: Checkbox,
      props: {
        label: i18n.t('labels.specialRequestOptions.adjacentRooms'),
      },
      default: false,
    },
    connectingRooms: {
      Component: Checkbox,
      props: {
        label: i18n.t('labels.specialRequestOptions.connectingRooms'),
      },
      default: false,
    },
    accessibleRoom: {
      Component: Checkbox,
      props: {
        label: i18n.t('labels.specialRequestOptions.accessibleRoom'),
      },
      default: false,
    },
    dietary: {
      Component: Checkbox,
      props: {
        label: i18n.t('labels.specialRequestOptions.dietary'),
      },
      default: false,
    },
  },
  comments: {
    label: i18n.t('labels.commentsOptional'),
    Component: TextArea,
    default: '',
  },
};
