import { AsyncHotelBooking, AsyncHotel } from 'pages/async';

export default [
  {
    name: 'Hotel',
    path: '/hotels/:id',
    component: AsyncHotel,
    auth: true,
    exact: true,
  },
  {
    name: 'Hotel',
    path: '/hotels/:id/booking/:complete?',
    component: AsyncHotelBooking,
    auth: true,
    exact: true,
  },
];
