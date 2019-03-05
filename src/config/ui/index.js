import { __, pipe, prop, propOr, head, tail } from 'ramda';

const uiConfig = {
  title: 'Pure Escapes',

  messages: {
    loading: 'Loading...',
    authenticating: 'Authenticating...',
    saving: 'Saving...',
    creatingAccount: 'Sending Request...',
    loggingIn: 'Logging in...',
  },

  labels: {
    search: 'Destination or resort',
    dates: 'Dates',
    lodging: 'Lodging',
    room: 'Room',
    guest: 'Guest',
    honeymooners: 'Honeymooners',

    yes: 'Yes',
    no: 'No',
  },

  buttons: {
    search: 'Search',
    request: 'Submit Request',
    login: 'Sign In',
  },

  placeholders: {
    search: 'Where to',
    dates: 'Select dates',
  },

  plurals: {
    night: ['Night', 'Nights'],
    guest: ['Guest', 'Guests'],
    room: ['Room', 'Rooms'],
    adult: ['Adult', 'Adults'],
    teen: ['Teen', 'Teens'],
    children: ['Children', 'Children'],
    infant: ['Infant', 'Infants'],
  },
};

export const getSingular = pipe(
  propOr([], __, prop('plurals', uiConfig)),
  head
);

export const getPlural = pipe(
  propOr([], __, prop('plurals', uiConfig)),
  tail
);

export const getPluralisation = (key, value) => (value === 1 ? getSingular(key) : getPlural(key));

export default uiConfig;
