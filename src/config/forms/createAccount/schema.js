import { prop } from 'ramda';
import { object, string, boolean } from 'yup';

import validations from 'config/forms/validations';

export default object().shape({
  firstName: string()
    .min(2, prop('min', validations))
    .required(prop('required', validations)),
  lastName: string()
    .min(2, prop('min', validations))
    .required(prop('required', validations)),
  email: string()
    .email('Invalid email')
    .required(prop('required', validations)),
  companyName: string()
    .min(2, prop('min', validations))
    .required(prop('required', validations)),
  companyCountry: string()
    .min(2, prop('min', validations))
    .max(2, prop('max', validations))
    .required(prop('required', validations)),
  landline: string()
    .matches(/[+]?[0-9]*/, prop('phone', validations))
    .required(prop('required', validations)),
  mobile: string()
    .matches(/[+]?[0-9]*/, prop('phone', validations))
    .required(prop('required', validations)),
  agreeToTerms: boolean().oneOf([true], prop('acceptTerms', validations)),
});
