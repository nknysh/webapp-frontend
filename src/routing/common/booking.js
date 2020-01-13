import { AsyncBooking, AsyncBookingList } from 'pages/async';

export default [
  {
    name: 'Booking Details',
    path: '/bookings/:id/:stage?',
    component: AsyncBooking,
    auth: true,
  },
  {
    name: 'Booking list',
    path: '/bookings',
    component: AsyncBookingList,
    auth: true,
  },
];
