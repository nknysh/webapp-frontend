import { string, object, ref, number } from 'yup';
import { prop, lte, defaultTo, toString, split, propOr, length, pipe, __ } from 'ramda';

import errors from './errors';

const decimalTest = pipe(
  defaultTo(''),
  toString,
  split('.'),
  propOr('', 1),
  length,
  lte(__, 2)
);

export default {
  number: (min = 0, max = 999999) =>
    number()
      .min(min, prop('min', errors))
      .max(max, prop('max', errors)),
  text: (min = 0, max = 999999) =>
    string()
      .min(min, prop('min', errors))
      .max(max, prop('max', errors))
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
  price: (min = 0, max = 999999) =>
    number()
      .min(min, prop('min', errors))
      .max(max, prop('max', errors))
      .test('decimal-test', prop('decimalPlaces', errors), decimalTest),
};
