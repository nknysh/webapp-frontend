import PropTypes from 'prop-types';
import { noop } from 'utils';

export const propTypes = {
  updatePassword: PropTypes.func,
  onComplete: PropTypes.func,
};

export const defaultProps = {
  updatePassword: noop,
  onComplete: noop,
};
