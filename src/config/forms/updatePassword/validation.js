import validators from 'config/forms/validators';
import { prop } from 'ramda';

import errors from 'config/forms/errors';

export default validators.shape({
  password: validators.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'passwordStrength'),
  passwordConfirm: validators.matches('password', prop('passwordsMatch', errors)),
});
