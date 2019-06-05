import PropTypes from 'prop-types';

import { noop } from 'utils';

import { fields, validation, data } from 'config/forms/bookingForm';

export const propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  renderSubmitButton: PropTypes.func,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
  children: PropTypes.any,
  fields: PropTypes.object,
  data: PropTypes.object,
  validation: PropTypes.object,
};

export const defaultProps = {
  initialValues: {},
  onSubmit: noop,
  renderSubmitButton: noop,
  validateOnBlur: false,
  validateOnChange: false,
  fields,
  data,
  validation,
};
