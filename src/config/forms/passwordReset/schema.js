import { prop } from 'ramda';
import { object, string } from 'yup';

import validations from 'config/forms/validations';

export default object().shape({
  email: string()
    .email('Invalid email')
    .required(prop('required', validations)),
});
