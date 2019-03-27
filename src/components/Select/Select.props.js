import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  onSelected: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export const defaultProps = {
  onChange: noop,
  onSelected: noop,
  options: {},
};
