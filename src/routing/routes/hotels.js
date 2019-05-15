import { AsyncHotel } from 'pages/Hotel';
import { AsyncHotelBooking } from 'pages/HotelBooking';

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
