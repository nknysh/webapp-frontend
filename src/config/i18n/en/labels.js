import { BookingStatusTypes } from 'config/enums';

export default {
  dashboard: 'Dashboard',

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

  yes: 'Yes',
  no: 'No',

  from: 'From',
  to: 'To',

  payByCC: 'Pay by credit card',
  payByCCConfirmed: 'Booking Confirmation',
  payByBT: 'Pay by bank transfer',
  payByBTConfirmed: 'Provisional Booking Confirmation',
  bookingConfirm: 'Confirm booking',
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

  takeAHold: 'Take a 24 hour hold on this booking with the Proposal',
  releaseHold: 'Are you sure you would like to release this provisional booking?',

  createdAt: 'Created on',
  leadGuestInfo: 'Lead Guest Info',
  flightInformation: 'Flight information',
  guestsDetails: 'Guest Details',
  totalNetCost: 'Total Net Cost',

  commission: 'Commission',
  notApplied: 'Not Applied',
  additionalResources: 'Other Resources',

  roomIsHeld: 'This room has a hold',
  roomIsHeld_plural: 'This room has {{count}} holds',
  expiresIn: 'Expires in',
  holdExpired: 'Hold has expired',

  confirmYourhold: 'Confirm your hold',

  resortDetails: 'Resort details',
  repeatGuest: 'Client is a repeating guest',

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
};
