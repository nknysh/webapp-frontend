import { prop } from 'ramda';
import { object, string, ref } from 'yup';

import validations from 'config/forms/validations';

export default object().shape({
  password: string().required(prop('required', validations)),
  confirm: string()
    .oneOf([ref('password'), null], prop('passwordsMatch', validations))
    .required(prop('required', validations)),
});
