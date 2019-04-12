import { Hotel, HotelBooking } from 'pages';

export default [
  {
    name: 'Hotel',
    path: '/hotels/:id',
    component: Hotel,
    auth: true,
    exact: true,
  },
  {
    name: 'Hotel',
    path: '/hotels/:id/booking/:complete?',
    component: HotelBooking,
    auth: true,
    exact: true,
  },
];
