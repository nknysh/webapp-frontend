import { __, pipe, prop, propOr, head, tail } from 'ramda';

const uiConfig = {
  title: 'Pure Escapes',

  messages: {
    loading: 'Loading...',
    authenticating: 'Authenticating...',
    saving: 'Saving...',
    creatingAccount: 'Sending Request...',
    loggingIn: 'Logging in...',
    loggingOut: 'Logging out...',
    passwordReset: 'Requesting Password Reset...',
    setPassword: 'Setting password...',
    searching: 'Searching...',
    gettingHotel: 'Getting hotel details...',
  },

  labels: {
    search: 'Destination or resort',
    dates: 'Dates',
    lodging: 'Lodging',
    room: 'Room',
    guest: 'Guest',
    honeymooners: 'Honeymooners',
    searching: 'Search',
    allRegions: 'All regions',
    specifyRegions: 'Specify regions',
    backToHome: 'back to homepage',
    backToSearch: 'back to search results',
    roomSize: 'Room size',
    standardOccupancy: 'Standard occupancy',
    maxOccupancy: 'Max occupancy',
    moreInfo: 'More information',
    filterByAmenities: 'Filter by amenities',

    yes: 'Yes',
    no: 'No',

    from: 'From',
    to: 'To',
  },

  buttons: {
    submit: 'Submit',
    search: 'Search',
    request: 'Submit Request',
    login: 'Sign In',
    passwordReset: 'Reset Your Password',
    forgotten: 'Forgot your password?',
    moreInfo: 'More Info',
    refine: 'Refine search results',
    removeFilters: 'Remove all filters',
    noRooms: 'No rooms available',
  },

  placeholders: {
    search: 'Where to',
    dates: 'Select dates',
  },

  plurals: {
    adult: ['Adult', 'Adults'],
    children: ['Children', 'Children'],
    guest: ['Guest', 'Guests'],
    infant: ['Infant', 'Infants'],
    night: ['Night', 'Nights'],
    mealPlan: ['Meal plan', 'Meal plans'],
    priceRange: ['Price Range', 'Price Ranges'],
    region: ['Region', 'Regions'],
    result: ['property found', 'properties found'],
    room: ['Room', 'Rooms'],
    roomType: ['Room Type', 'Room Types'],
    star: ['Star', 'Stars'],
    starRating: ['Accomodation', 'Accomodations'],
    teen: ['Teen', 'Teens'],
    feature: ['Feature', 'Features'],
    brochure: ['Brochure', 'Brochures'],
  },

  mealTypes: {
    bb: 'Breakfast Included',
    hb: 'Breakfast & Dinner (Drinks excluded)',
    fb: '3 meals per day (Drinks excluded)',
    ai: 'All Inclusive',
  },

  sections: {
    latestOffers: 'Pure Escapes Latest Offers',
  },

  taglines: {
    validFromTo: 'Valid from {fromDate} to {toDate}.',
    validForAllVillas: 'Offer applies to all villa categories',
    suitableHoneymoon: 'BEST FOR HONEYMOONERS',
    pricesIn: 'Prices shown are in US Dollars',
  },

  currency: {
    symbol: '$',
  },

  dates: {
    defaultFormat: 'YYYY-MM-DD',
  },

  defaults: {
    priceRange: [2000, 10000],
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
