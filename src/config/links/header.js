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
      href: `${ADMIN_BASE_URL}/offers`,
      hard: true,
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
      href: `${ADMIN_BASE_URL}/offers`,
      hard: true,
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
