import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  inverse: PropTypes.bool,
  spaced: PropTypes.bool,
  bold: PropTypes.bool,
  onClick: PropTypes.func,
};

export const defaultProps = {
  inverse: false,
  spaced: false,
  bold: false,
  onClick: noop,
};
