/**
 * Copyright © 2018 Gigster, Inc. All Rights Reserved.
 *
 * This software and/or related documentation, is protected by copyright and
 * other intellectual property laws, and Gigster and/or its licensors, as
 * applicable, own all right, title and interest in and to its content, and all
 * derivatives, translations, adaptations and combinations of the foregoing. You
 * are not permitted to copy, distribute, transmit, store, display, perform,
 * reproduce, publish, license, create derivative works from, transfer, sell, or
 * make any other use of this software and/or related documentation unless you
 * have entered into a written agreement with Gigster regarding such usage. You
 * agree that all such usage of the software and/or related documentation shall
 * be subject to the terms and conditions of such written agreement, including
 * all applicable license restrictions.
 */

// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

/* Import custom pages here */
import {
  About,
  AdminDashboard,
  AdminBookingsList,
  AdminHotelCreate,
  AdminHotelsList,
  AdminHotelUpdate,
  AdminProposalsList,
  AdminRatesList,
  AdminRoomCreate,
  AdminRoomUpdate,
  BookingGuestDetails,
  BookingList,
  BookingOptionsList,
  BookingPayment,
  BookingView,
  Calendar,
  Contact,
  CreateUser,
  Home,
  HotelsSearch,
  HotelView,
  Login,
  NotFound,
  Privacy,
  ResetPassword,
  SalesRepresentativesList,
  Search,
  SetPassword,
  SettingsCompany,
  SettingsNotifications,
  SettingsPreferences,
  SettingsProfile,
  SettingsTravelAgents,
  Terms,
  TravelAgentsList,
  TravelAgentView,
  ProposalsList,
  ProposalView,
  UserBookings,
} from '../pages';

/* eslint-disable no-unused-vars */
import { routes as adminRoutes } from './admin';
import { RequireAuthentication, RedirectIfAuthenticated } from './authFlow';
import { AuthenticatedRoute } from './routes';
/* eslint-enable */

const routeMap = {
  // Landing
  root: {
    name: 'Root Path',
    path: '/',
    exact: true,
    route: AuthenticatedRoute,
    getComponent: ({ isAuthenticated }) => isAuthenticated ? Search : Home,
  },
  about: {
    name: 'About Path',
    path: '/about',
    exact: true,
    component: About,
  },
  contact: {
    name: 'Contact Path',
    path: '/contact',
    exact: true,
    component: Contact,
  },
  privacy: {
    name: 'Privacy Path',
    path: '/privacy',
    exact: true,
    component: Privacy,
  },
  terms: {
    name: 'Terms Path',
    path: '/terms',
    exact: true,
    component: Terms,
  },
  login: {
    name: 'Login Path',
    path: '/login',
    exact: true,
    component: Login,
  },
  resetPassword: {
    name: 'Reset Password Path',
    path: '/password/reset',
    exact: true,
    component: ResetPassword,
  },

  // Logged In
  setPassword: {
    name: 'Set Password Path',
    path: '/password/new',
    exact: true,
    component: SetPassword,
  },
  createUser: {
    name: 'Create User Path',
    path: '/sign-up',
    exact: true,
    component: CreateUser,
  },
  calendar: {
    name: 'Calendar Path',
    path: '/calendar',
    exact: true,
    route: AuthenticatedRoute,
    component: Calendar,
  },
  hotelsSearch: {
    name: 'Hotels Search Path',
    path: '/hotels',
    exact: true,
    route: AuthenticatedRoute,
    component: HotelsSearch,
  },
  hotelView: {
    name: 'Hotel View Path',
    path: '/hotels/:id',
    exact: true,
    route: AuthenticatedRoute,
    component: HotelView,
  },

  // Bookings
  bookings: {
    name: 'Bookings Path',
    path: '/bookings',
    exact: true,
    route: AuthenticatedRoute,
    component: BookingList,
  },
  bookingGuestDetails: {
    name: 'Booking Guest Details Path',
    path: '/bookings/:id/guests',
    exact: true,
    route: AuthenticatedRoute,
    component: BookingGuestDetails,
  },
  bookingPayment: {
    name: 'Booking Payment Path',
    path: '/bookings/:id/payment',
    exact: true,
    route: AuthenticatedRoute,
    component: BookingPayment,
  },
  bookingView: {
    name: 'Booking View Path',
    path: '/bookings/:id',
    exact: true,
    route: AuthenticatedRoute,
    component: BookingView,
  },
  bookingOptionsList: {
    name: 'Booking Options (Holds) Path',
    path: '/holds',
    exact: true,
    route: AuthenticatedRoute,
    component: BookingOptionsList,
  },

  // Proposals
  proposalsList: {
    name: 'Proposal View Path',
    path: '/proposals',
    exact: true,
    route: AuthenticatedRoute,
    component: ProposalsList,
  },
  proposalView: {
    name: 'Proposal View Path',
    path: '/proposals/:id',
    exact: true,
    route: AuthenticatedRoute,
    component: ProposalView,
  },

  // Settings
  settings: {
    name: 'Settings Path',
    exact: true,
    from: '/settings',
    to: '/settings/profile',
    route: Redirect,
  },
  settingsCompany: {
    name: 'Settings Company Path',
    path: '/settings/company',
    exact: true,
    route: AuthenticatedRoute,
    component: SettingsCompany,
  },
  settingsNotifications: {
    name: 'Settings Notifications Path',
    path: '/settings/notifications',
    exact: true,
    route: AuthenticatedRoute,
    component: SettingsNotifications,
  },
  settingsPreferences: {
    name: 'Settings Preferences Path',
    path: '/settings/preferences',
    exact: true,
    route: AuthenticatedRoute,
    component: SettingsPreferences,
  },
  settingsProfile: {
    name: 'Settings Profile Path',
    path: '/settings/profile',
    exact: true,
    route: AuthenticatedRoute,
    component: SettingsProfile,
  },
  settingsTravelAgents: {
    name: 'Settings Travel Agents Path',
    path: '/settings/travel-agents',
    exact: true,
    route: AuthenticatedRoute,
    component: SettingsTravelAgents,
  },

  // Users
  travelAgentView: {
    name: 'Travel Agent View Path',
    path: '/users/:id',
    route: AuthenticatedRoute,
    component: TravelAgentView,
  },
  userBookings: {
    name: 'User Bookings Path',
    path: '/users/:id/bookings',
    exact: true,
    route: AuthenticatedRoute,
    component: UserBookings,
  },

  // Admin
  admin: {
    name: 'Admin Path',
    exact: true,
    from: '/admin',
    to: '/admin/dashboard',
    route: Redirect,
  },
  adminDashboard: {
    name: 'Admin Dashboard Path',
    path: '/admin/dashboard',
    exact: true,
    route: AuthenticatedRoute,
    component: AdminDashboard,
  },
  adminBookingsList: {
    name: 'Admin Bookings List Path',
    path: '/admin/bookings',
    exact: true,
    route: AuthenticatedRoute,
    component: AdminBookingsList,
  },
  adminHotelsList: {
    name: 'Admin Hotels List Path',
    path: '/admin/hotels',
    exact: true,
    route: AuthenticatedRoute,
    component: AdminHotelsList,
  },
  adminHotelCreate: {
    name: 'Admin Hotel Create Path',
    path: '/admin/hotels/new',
    exact: true,
    route: AuthenticatedRoute,
    component: AdminHotelCreate,
  },
  adminHotelUpdate: {
    name: 'Admin Hotel Update Path',
    path: '/admin/hotels/:id/edit',
    exact: true,
    route: AuthenticatedRoute,
    component: AdminHotelUpdate,
  },
  adminRoomCreate: {
    name: 'Admin Room Create Path',
    path: '/admin/hotels/:id/rooms/new',
    exact: true,
    route: AuthenticatedRoute,
    component: AdminRoomCreate,
  },
  adminRoomUpdate: {
    name: 'Admin Room Update Path',
    path: '/admin/hotels/:hotelId/rooms/:id/edit',
    exact: true,
    route: AuthenticatedRoute,
    component: AdminRoomUpdate,
  },
  adminRatesList: {
    name: 'Admin Rates List Path',
    path: '/admin/rooms/:id/rates',
    exact: true,
    route: AuthenticatedRoute,
    component: AdminRatesList,
  },
  adminProposalsList: {
    name: 'Admin Proposals List Path',
    path: '/admin/proposals',
    exact: true,
    route: AuthenticatedRoute,
    component: AdminProposalsList,
  },
  adminSalesRepresentatives: {
    name: 'Admin Sales Representatives List Path',
    path: '/admin/sales-representatives',
    exact: true,
    route: AuthenticatedRoute,
    component: SalesRepresentativesList,
  },
  adminTravelAgentsList: {
    name: 'Admin Travel Agents List Path',
    path: '/admin/travel-agents',
    exact: true,
    route: AuthenticatedRoute,
    component: TravelAgentsList,
  },
  ...adminRoutes,

  // Default route
  notFound: {
    name: 'Not Found Path',
    path: '*',
    component: NotFound,
  },
};

const createRoute = routeKey => {
  const {
    name,
    path,
    component,
    route = Route,
    ...props
  } = routeMap[routeKey];

  return React.createElement(route, {
    key: `route-${routeKey}`,
    path,
    component,
    ...props,
  });
};

const RouteComponent = ({ routeKeys }) => (
  <Router>
    <Switch>
      {routeKeys.map(routeKey => createRoute(routeKey))}
    </Switch>
  </Router>
);

RouteComponent.propTypes = {
  routeKeys: PropTypes.arrayOf(PropTypes.string),
};

RouteComponent.defaultProps = {
  routeKeys: [],
};

const AppRouter = () => (
  <RouteComponent routeKeys={Object.keys(routeMap)} />
);

const StoryRouter = () => {
  // Storybook always loads at the root url, then
  // renders the selected story based on query string params.
  //
  // The root url causes our `root` or `default` routes to trigger,
  // so we remove them from the route array to prevent
  // double rendering in a story.
  const ROOT_ROUTES = ['root', 'default'];
  const keys = Object.keys(routeMap).filter(key => !ROOT_ROUTES.includes(key));

  return (
    <RouteComponent routeKeys={keys} />
  );
};

const routes = Object.keys(routeMap)
  .reduce((finalRoutes, routeKey) => {
    const route = routeMap[routeKey];

    if (!!route.name && !!route.path) {
      finalRoutes[routeKey] = {
        name: route.name,
        path: route.path,
      };
    }

    return finalRoutes;
  }, {});

const getQuery = (location) => qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

export {
  getQuery,
  routes,
  AppRouter,
  StoryRouter,
};
