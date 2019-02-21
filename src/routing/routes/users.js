import { TravelAgentView, UserBookings } from 'pages';

export default [
  {
    name: 'Travel Agent View Path',
    path: '/users/:id',
    auth: true,
    component: TravelAgentView,
  },
  {
    name: 'User Bookings Path',
    path: '/users/:id/bookings',
    auth: true,
    component: UserBookings,
  },
];
