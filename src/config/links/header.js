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
      href: `${ADMIN_BASE_URL}/proposals`,
      hard: true,
    },
    {
      title: 'Bookings',
      href: `${ADMIN_BASE_URL}/bookings`,
      hard: true,
    },
  ],
  sr: [
    {
      title: 'Dashboard',
      href: '/',
    },
    {
      title: 'Bookings',
      href: `${ADMIN_BASE_URL}/bookings`,
      hard: true,
    },
    {
      title: 'Holds',
      href: `${ADMIN_BASE_URL}/holds`,
      hard: true,
    },
    {
      title: 'Travel Agents',
      href: `${ADMIN_BASE_URL}/travel-agents`,
      hard: true,
    },
  ],
  admin: [],
};
