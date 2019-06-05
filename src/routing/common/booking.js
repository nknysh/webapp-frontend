import { AsyncBooking } from 'pages/async';

export default [
  {
    name: 'Booking Details',
    path: '/bookings/:id/:stage?',
    component: AsyncBooking,
    auth: true,
  },
];
