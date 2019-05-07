import { CONFLICT } from 'http-status';

import info from './content/info.md';
import complete from './content/complete.md';
import exists from './content/error--exists.md';
import unknown from './content/error--unknown.md';

export default {
  titles: {
    default: 'Create an Account',
    complete: 'Thank you for your interest!',
  },
  content: {
    info,
    complete,
  },
  errors: {
    default: unknown,
    [CONFLICT]: exists,
  },
};
