import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onLogin: PropTypes.func,
  onComplete: PropTypes.func,
  requestStatus: PropTypes.string,
};

export const defaultProps = {
  onLogin: noop,
  onComplete: noop,
};
