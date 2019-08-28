import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  renderSubmitButton: PropTypes.func,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
};

export const defaultProps = {
  initialValues: {},
  onSubmit: noop,
  renderSubmitButton: noop,
  validateOnBlur: false,
  validateOnChange: false,
};
