import validators from 'config/forms/validators';
import { prop } from 'ramda';

import errors from 'config/forms/errors';

export default validators.shape({
  newPassword: validators.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'passwordStrength'),
  newPasswordConfirm: validators.matches('newPassword', prop('passwordsMatch', errors)),
});
