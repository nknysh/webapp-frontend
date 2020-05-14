import { ADMIN_BASE_URL } from '../';

export default {
  loggedOut: {
    createAccount: {
      title: 'Create an account',
      href: '/sign-up',
      id: 'sign-up',
    },
    login: {
      title: 'Login',
      href: '/login',
      inverse: true,
      bold: true,
    },
  },

  default: [
    {
      title: 'Home',
      id: 'home',
      href: '/',
    },
    {
      title: 'Proposals',
      href: `/proposals`,
    },
    {
      title: 'Enquiries and Bookings',
      href: `/bookings`,
    },
  ],
  rl: [
    {
      title: 'Hotels',
      href: `${ADMIN_BASE_URL}/hotels`,
      hard: true,
    },
    {
      title: 'Offers',
      href: `/offers`,
    },
    {
      title: 'Content',
      href: `${ADMIN_BASE_URL}/contents`,
      hard: true,
    },
  ],
  sr: [
    {
      title: 'Dashboard',
      href: '/',
    },
    {
      title: 'Hotels',
      href: `${ADMIN_BASE_URL}/hotels`,
      hard: true,
    },
    {
      title: 'Proposals',
      href: `/proposals`,
      hard: true,
    },
    {
      title: 'Enquiries and Bookings',
      href: `/bookings`,
    },
    {
      title: 'Travel Agents',
      href: `${ADMIN_BASE_URL}/travel-agents`,
      hard: true,
    },
  ],
  admin: [
    {
      title: 'Dashboard',
      href: '/',
    },
    {
      title: 'Companies',
      href: `${ADMIN_BASE_URL}/companies`,
      hard: true,
    },
    {
      title: 'Hotels',
      href: `${ADMIN_BASE_URL}/hotels`,
      hard: true,
    },
    {
      title: 'Offers',
      href: `/offers`,
    },
    {
      title: 'Content',
      href: `${ADMIN_BASE_URL}/contents`,
      hard: true,
    },
    {
      title: 'Proposals',
      href: `/proposals`,
    },
    {
      title: 'Enquiries and Bookings',
      href: `/bookings`,
    },
    {
      title: 'Users',
      href: `${ADMIN_BASE_URL}/users`,
      hard: true,
    },
  ],
};
