import unknown from './content/error--unknown.md';
import expired from './content/error--expired.md';

export default {
  titles: {
    default: 'Set your password',
    complete: 'Password has been reset',
  },
  errors: {
    default: unknown,
    401: expired,
  },
};
