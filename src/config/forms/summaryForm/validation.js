import validators from '../validators';
import { prop } from 'ramda';

import errors from '../errors';

export default validators.shape({
  valid: validators.boolean(prop('bookingValid', errors)),
});
