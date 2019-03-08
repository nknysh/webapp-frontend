import validators from 'config/forms/validators';
import { prop } from 'ramda';

import errors from 'config/forms/errors';

export default validators.shape({
  password: validators.text(2),
  confirm: validators.matches('password', prop('passwordsMatch', errors)),
});
