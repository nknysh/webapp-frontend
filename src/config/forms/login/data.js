import unverified from './content/error--unverified.md';
import unknown from './content/error--unknown.md';
import unauthorized from './content/error--unauthorized.md';

export default {
  titles: {
    default: 'Sign in',
  },
  errors: {
    default: unknown,
    403: unverified,
    401: unauthorized,
  },
};
