import { string, object, ref } from 'yup';
import { prop } from 'ramda';

import errors from './errors';

export default {
  text: (min = 0, max = 999) =>
    string()
      .min(min, prop('min', errors))
      .max(max, prop('min', errors))
      .required(prop('required', errors)),
  match: (pattern, errorKey) =>
    string()
      .matches(pattern, prop(errorKey, errors))
      .required(prop('required', errors)),
  email: () =>
    string()
      .email(prop('email', errors))
      .required(prop('required', errors)),
  shape: obj => object().shape(obj),
  boolean: (message = prop('acceptTerms', errors)) => string().oneOf(['true'], message),
  matches: (refKey, message) =>
    string()
      .oneOf([ref(refKey), null], message)
      .required(prop('required', errors)),
};
