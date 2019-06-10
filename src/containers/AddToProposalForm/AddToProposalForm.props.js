import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  availableToHold: PropTypes.bool,
};

export const defaultProps = {
  onSubmit: noop,
  disabled: false,
  availableToHold: false,
};
