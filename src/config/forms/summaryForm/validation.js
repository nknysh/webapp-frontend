import validators from 'config/forms/validators';
import { prop } from 'ramda';

import errors from 'config/forms/errors';

export default validators.shape({
  valid: validators.boolean(prop('bookingValid', errors)),
});