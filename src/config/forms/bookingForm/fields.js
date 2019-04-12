import { prop } from 'ramda';

import Checkbox from 'components/Checkbox';
import Select from 'components/Select';

import formConfig from 'config/forms';

export default {
  guestTitle: {
    label: 'Title (optional)',
    default: '',
    Component: Select,
    props: {
      options: prop('titles', formConfig),
    },
    section: 'Lead Guest Info',
  },
  guestFirstName: {
    label: 'First name',
    default: '',
    section: 'Lead Guest Info',
  },
  guestLastName: {
    label: 'Last name',
    default: '',
    section: 'Lead Guest Info',
  },
  isRepeatGuest: {
    Component: Checkbox,
    default: false,
    section: 'Lead Guest Info',
    props: {
      label: 'This client is a repeating guest',
    },
  },
  flightArrivalNumber: {
    default: '',
    label: 'Arrival Flight Number (Optional)',
    section: 'Flight Information',
  },
  flightDepartureNumber: {
    default: '',
    label: 'Departure Flight Number (Optional)',
    section: 'Flight Information',
  },
  flightArrivalDate: {
    label: 'Arrival Date (optional)',
    default: undefined,
  },
  flightDepartureDate: {
    label: 'Departure Date (optional)',
    default: undefined,
  },
  specialRequests: {
    cribCob: {
      Component: Checkbox,
      props: {
        label: 'Crib Cob',
      },
      default: false,
    },
    bedGuard: {
      Component: Checkbox,
      props: {
        label: 'Bed Guard',
      },
      default: false,
    },
    adjacentRooms: {
      Component: Checkbox,
      props: {
        label: 'Adjacent Rooms',
      },
      default: false,
    },
    connectingRooms: {
      Component: Checkbox,
      props: {
        label: 'Connecting Rooms',
      },
      default: false,
    },
    accessibleRoom: {
      Component: Checkbox,
      props: {
        label: 'Accessible Room',
      },
      default: false,
    },
    dietary: {
      Component: Checkbox,
      props: {
        label: 'Dietary',
      },
      default: false,
    },
  },
};
