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
      title: 'Proposals',
      href: `${ADMIN_BASE_URL}/proposals`,
      hard: true,
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
      title: 'Bookings',
      href: `${ADMIN_BASE_URL}/bookings`,
      hard: true,
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
      title: 'Bookings',
      href: `${ADMIN_BASE_URL}/bookings`,
      hard: true,
    },
    {
      title: 'Proposals',
      href: `${ADMIN_BASE_URL}/proposals`,
      hard: true,
    },
    {
      title: 'Travel Agents',
      href: `${ADMIN_BASE_URL}/travel-agents`,
      hard: true,
    },
    {
      title: 'Sales Representatives',
      href: `${ADMIN_BASE_URL}/sales-representatives`,
      hard: true,
    },
  ],
};
