import PropTypes from 'prop-types';

import { fields, validation } from 'config/forms/bookingConfirm';

export const propTypes = {
  fields: PropTypes.object,
  validation: PropTypes.object,
};

export const defaultProps = {
  fields,
  validation,
};
