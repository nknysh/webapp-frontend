import { BookingStatusTypes } from 'config/enums';

export default {
  none: 'None',
  dashboard: 'Dashboard',

  search: 'Destination or resort',
  dates: 'Dates',
  lodging: 'Lodging',
  room: 'Room',
  roomWithNumber: 'Room {{number}}',
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
  lessInfo: 'Less information',
  filterByAmenities: 'Filter by amenities',
  seeAmenities: 'See Amenities',
  hideAmenities: 'Hide Amenities',
  filterByCategoryTypes: 'Filter by room types',
  noRooms: 'No rooms available',
  hotelDetails: 'Hotel Details',
  yourSelection: 'Your Selection',
  totalNet: 'Total net cost',
  returnTransfers: 'Return transfers',
  groundService: 'Ground service',
  addOns: 'Addons',
  addAccommodation: 'Add Accommodation',
  addCommission:
    'Add your commission (If client is paying Pure Escapes directly or if you wish to send this proposal directly to your clients)',
  includesTaxes: 'Includes all applicable taxes.',
  savingOfPrefix: 'You will save ',
  savingOfSuffix: ' compared to booking directly with this location.',
  applyMargin: 'Apply a margin',
  currentMargin: 'Your current margin will be',
  currentMarginPercentageSuffix: 'of the total cost shown above.',
  enterGuestDetails: 'Enter guest details',
  reviewAndConfirm: 'Review and confirm',
  booking: 'Booking',
  bookingWithId: 'Booking #{{id}}',
  included: 'inc.',
  extra: 'Extra',
  min: 'Min',
  max: 'Max',
  squareMeters: 'Square Meters',
  addons: 'Addons',
  onRequest: 'On Request',
  out: 'Outbound',
  in: 'Inbound',
  notReady: 'Booking Not Ready',
  termsAndConditions: 'Terms and Conditions',
  currentPassword: 'Current password',
  password: 'Password',
  repeatPassword: 'Repeat password',
  rememberMe: 'Remember me',

  yes: 'Yes',
  no: 'No',

  from: 'From',
  to: 'To',

  payByCC: 'Pay by credit card',
  payByCCConfirmed: 'Booking Confirmation',
  payByBT: 'Pay by bank transfer',
  payByBTConfirmed: 'Provisional Booking Confirmation',
  bookingConfirm: 'Confirm booking request',
  bookingConfirmed: 'Booking Confirmation',
  bookingConfirmedOnRequest: 'Booking Request Confirmation',
  bookingConfirmOnRequest: 'Confirm Your booking on request',

  proposalWithId: 'Proposal #{{id}}',
  proposals: 'Proposals',
  newProposal: 'New proposal',
  proposalId: 'Proposal',
  proposalName: 'New Proposal Name',

  resortsIncluded: 'Resorts included',
  reviewAndGenerate: 'Review and Generate',

  propertiesAndRooms: 'Properties and rooms included in this proposal',
  concludeBooking: 'By concluding the booking process, I accept the ',
  agreeTo: 'I agree to ',

  takeAHold: 'Take a 24 hour hold on this booking with the Proposal',
  releaseHold: 'Are you sure you would like to release this provisional booking?',

  createdAt: 'Created on',
  leadGuestInfo: 'Lead Guest Info',
  flightInformation: 'Flight information',
  specialRequests: 'Special Requests',
  guestsDetails: 'Guest Details',
  totalNetCost: 'Total Net Cost',

  commission: 'Commission',
  notApplied: 'Not Applied',
  additionalResources: 'Other Resources',
  additionalInfo: 'Additional Information',
  thingsToBeAwareOf: 'Things to be aware of with this resort',
  policiesAndRestrictions: 'Policies & Restrictions',
  cancellationPolicy: 'Cancellation Policy',
  paymentTerms: 'Payment Terms',
  offersTerms: 'Offers Terms',

  roomIsHeld: 'This room has a hold',
  roomIsHeld_plural: 'This room has {{count}} holds',
  expiresIn: 'Expires in',
  holdExpired: 'Hold has expired',

  confirmYourhold: 'Confirm your hold',
  accommodationPricesInfo:
    'Accommodation prices given for full stay with standard occupancy, default meal plan and includes all taxes. Excludes transfers, extra person supplements and any further add ons',
  resortDetails: 'Resort details',
  repeatGuest: 'Client is a repeating guest',
  isRepeat: 'Repeat Guest',
  fullRepeatGuest: 'This client is a repeating guest',

  priceBasedOn: 'Price based on:',
  nightsIn: '{{count}} {{nights}} in {{title}}, {{mealPlan}} ({{startDate}} - {{endDate}})',

  searchForTA: 'Search for Travel Agent',

  potential: 'Potential',
  requested: 'Requested',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',

  latestTa: {
    [BookingStatusTypes.POTENTIAL]: "Latest TA's Potential Bookings",
    [BookingStatusTypes.REQUESTED]: "Latest TA's Requested Bookings",
    [BookingStatusTypes.CONFIRMED]: "Latest TA's Confirmed Bookings",
    [BookingStatusTypes.CANCELLED]: "Latest TA's Cancelled Bookings",
  },

  details: 'Details',
  uuid: 'UUID',
  status: 'Status',

  latestTaBookings: 'Latest TA Bookings',
  viewAllBookings: 'View all bookings',
  overrideTotal: 'Override Total',
  bookingComments: 'Booking comments',
  internalComments: 'Internal comments',
  cancelBooking: 'Cancel Booking',

  includesOffer: 'Includes {{count}} offer',
  includesOffer_plural: 'Includes {{count}} offers',

  preferred: 'Preferred',

  occasions: {
    honeymoon: 'Honeymoon',
    birthday: 'Birthday',
    anniversary: 'Anniversary',
  },

  title: 'Title',
  titleOptional: 'Title (optional)',

  firstName: 'First Name',
  lastName: 'Last Name',
  emailAddress: 'Email address',
  existingPartner: 'Are you an existing partner?',
  company: {
    name: 'Company name',
    country: 'Company country',
  },
  landline: 'Landline',
  mobile: 'Mobile',

  arrivalFlightNumber: 'Arrival Flight Number (Optional)',
  departureFlightNumber: 'Departure Flight Number (Optional)',
  arrivalDate: 'Arrival Date (optional)',
  departureDate: 'Departure Date (optional)',
  commentsOptional: 'Comments (optional)',

  specialRequestOptions: {
    cribCob: 'Crib Cob',
    bedGuard: 'Bed Guard',
    adjacentRooms: 'Adjacent Rooms',
    connectingRooms: 'Connecting Rooms',
    accessibleRoom: 'Accessible Room',
    dietary: 'Dietary',
  },

  personTitles: {
    noTitle: 'No Title',
    master: 'Master',
    miss: 'Miss',
    mr: 'Mr.',
    mrs: 'Mrs.',
    ms: 'Ms.',
  },

  selectAvailableAccomodations: 'Select Available Accomodations',

  logout: 'Logout',
  settings: 'Settings',

  profileDetails: 'Profile Details',
  companyDetails: 'Company Details',

  receiveEmailAlerts: 'Receive Email Alerts',

  accountRep: 'Your Pure Escapes Representative',
  accountStatus: 'Your Account Status',

  availability: 'Availability',
  availableToHold: 'This hotel has accommodation available to hold',
  availableToHoldRoom: 'This accommodation is available to hold',
  availableToHoldGeneric: 'Available to hold',

  specifyAges: 'Please specifiy ages:',

  noResults: 'No results found',
  roomsAndGuestSelection: 'Rooms & Guests Selection',
  mealPlanOffersAvailable: 'Meal plan offers available',
};
