import {
  AdminHotelCreate,
  AdminHotelsList,
  AdminRoomCreate,
  AdminDashboard,
  AdminBookingsList,
  AdminHotelUpdate,
  AdminProposalsList,
  AdminRatesList,
  AdminRoomUpdate,
} from 'pages/Admin';
import { SalesRepresentativesList, TravelAgentsList } from 'pages';

export default [
  {
    name: 'Admin Path',
    from: '/admin',
    to: '/admin/dashboard',
    exact: true,
  },
  {
    name: 'Admin Dashboard Path',
    path: '/admin/dashboard',
    auth: true,
    component: AdminDashboard,
  },
  {
    name: 'Admin Bookings List Path',
    path: '/admin/bookings',
    auth: true,
    component: AdminBookingsList,
  },
  {
    name: 'Admin Hotels List Path',
    path: '/admin/hotels',
    auth: true,
    component: AdminHotelsList,
  },
  {
    name: 'Admin Hotel Create Path',
    path: '/admin/hotels/new',
    auth: true,
    component: AdminHotelCreate,
  },
  {
    name: 'Admin Hotel Update Path',
    path: '/admin/hotels/:id/edit',
    auth: true,
    component: AdminHotelUpdate,
  },
  {
    name: 'Admin Room Create Path',
    path: '/admin/hotels/:id/rooms/new',
    auth: true,
    component: AdminRoomCreate,
  },
  {
    name: 'Admin Room Update Path',
    path: '/admin/hotels/:hotelId/rooms/:id/edit',
    auth: true,
    component: AdminRoomUpdate,
  },
  {
    name: 'Admin Rates List Path',
    path: '/admin/rooms/:id/rates',
    auth: true,
    component: AdminRatesList,
  },
  {
    name: 'Admin Proposals List Path',
    path: '/admin/proposals',
    auth: true,
    component: AdminProposalsList,
  },
  {
    name: 'Admin Sales Representatives List Path',
    path: '/admin/sales-representatives',
    auth: true,
    component: SalesRepresentativesList,
  },
  {
    name: 'Admin Travel Agents List Path',
    path: '/admin/travel-agents',
    auth: true,
    component: TravelAgentsList,
  },
  {
    name: 'Admin Path',
    from: '/admin',
    to: '/admin/dashboard',
    exact: true
  },
  {
    name: 'Admin Dashboard Path',
    path: '/admin/dashboard',
    auth: true,
    component: AdminDashboard,
  },
  {
    name: 'Admin Bookings List Path',
    path: '/admin/bookings',
    auth: true,
    component: AdminBookingsList,
  },
  {
    name: 'Admin Hotels List Path',
    path: '/admin/hotels',
    auth: true,
    component: AdminHotelsList,
  },
  {
    name: 'Admin Hotel Create Path',
    path: '/admin/hotels/new',
    auth: true,
    component: AdminHotelCreate,
  },
  {
    name: 'Admin Hotel Update Path',
    path: '/admin/hotels/:id/edit',
    auth: true,
    component: AdminHotelUpdate,
  },
  {
    name: 'Admin Room Create Path',
    path: '/admin/hotels/:id/rooms/new',
    auth: true,
    component: AdminRoomCreate,
  },
  {
    name: 'Admin Room Update Path',
    path: '/admin/hotels/:hotelId/rooms/:id/edit',
    auth: true,
    component: AdminRoomUpdate,
  },
  {
    name: 'Admin Rates List Path',
    path: '/admin/rooms/:id/rates',
    auth: true,
    component: AdminRatesList,
  },
  {
    name: 'Admin Proposals List Path',
    path: '/admin/proposals',
    auth: true,
    component: AdminProposalsList,
  },
  {
    name: 'Admin Sales Representatives List Path',
    path: '/admin/sales-representatives',
    auth: true,
    component: SalesRepresentativesList,
  },
  {
    name: 'Admin Travel Agents List Path',
    path: '/admin/travel-agents',
    auth: true,
    component: TravelAgentsList,
  },
];
