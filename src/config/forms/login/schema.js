import { prop } from 'ramda';
import { object, string } from 'yup';

import validations from 'config/forms/validations';

export default object().shape({
  email: string()
    .email('Invalid email')
    .required(prop('required', validations)),
  password: string()
    .min(2, prop('min', validations))
    .required(prop('required', validations)),
});
