import PropTypes from 'prop-types';
import { noop } from 'utils';

export const propTypes = {
  usersStatus: PropTypes.string,
  user: PropTypes.object,
  isSr: PropTypes.bool,
  updateMe: PropTypes.func,
};

export const defaultProps = {
  updateMe: noop,
};
