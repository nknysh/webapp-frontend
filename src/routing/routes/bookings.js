import { BookingGuestDetails, BookingList, BookingOptionsList, BookingPayment, BookingView } from 'pages';

export default [
  {
    name: 'Bookings Path',
    path: '/bookings',
    auth: true,
    component: BookingList,
  },
  {
    name: 'Booking Guest Details Path',
    path: '/bookings/:id/guests',
    auth: true,
    component: BookingGuestDetails,
  },
  {
    name: 'Booking Payment Path',
    path: '/bookings/:id/payment',
    auth: true,
    component: BookingPayment,
  },
  {
    name: 'Booking View Path',
    path: '/bookings/:id',
    auth: true,
    component: BookingView,
  },
  {
    name: 'Booking Options (Holds) Path',
    path: '/holds',
    auth: true,
    component: BookingOptionsList,
  },
];
