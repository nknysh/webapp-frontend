import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onChange: PropTypes.func,
  onApply: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.any,
  type: PropTypes.string,
  summaryOnly: PropTypes.bool,
  total: PropTypes.any,
};

export const defaultProps = {
  onChange: noop,
  onApply: noop,
  total: 0,
};
