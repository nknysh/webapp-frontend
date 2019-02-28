import { __, pipe, prop, propOr, head, tail } from 'ramda';

const uiConfig = {
  title: 'Pure Escapes',

  messages: {
    loading: 'Loading...',
    authenticating: 'Authenticating...',
  },

  labels: {
    search: 'Destination or resort',
    dates: 'Dates',
    lodging: 'Lodging',
    room: 'Room',
    guest: 'Guest',
  },

  buttons: {
    search: 'Search',
  },

  placeholders: {
    search: 'Where to',
    dates: 'Select dates',
  },

  plurals: {
    night: ['Night', 'Nights'],
    guest: ['Guest', 'Guests'],
    room: ['Room', 'Rooms'],
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
