import { ADMIN_BASE_URL } from 'config';

export default {
  loggedOut: {
    createAccount: {
      title: 'Create an account',
      href: '/sign-up',
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
      href: '/',
    },
    {
      title: 'Proposals',
      href: '/proposals',
    },
    {
      title: 'Bookings',
      href: '/bookings',
    },
    {
      title: 'Holds',
      href: '/holds',
    },
    {
      title: 'Calendar',
      href: '/calendar',
    },
  ],
  sr: [
    {
      title: 'Dashboard',
      href: '/',
    },
    {
      title: 'Bookings',
      href: `${ADMIN_BASE_URL}/index.html#/bookings`,
      hard: true,
    },
    {
      title: 'Holds',
      href: `${ADMIN_BASE_URL}/index.html#/holds`,
      hard: true,
    },
    {
      title: 'Travel Agents',
      href: `${ADMIN_BASE_URL}/index.html#/travel-agents`,
      hard: true,
    },
  ],
  admin: [],
};
