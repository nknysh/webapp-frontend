import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onSelected: PropTypes.func,
  open: PropTypes.bool,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export const defaultProps = {
  onChange: noop,
  onClose: noop,
  onOpen: noop,
  onSelected: noop,
  open: false,
  options: {},
};
