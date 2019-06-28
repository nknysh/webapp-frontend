import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onSignUp: PropTypes.func,
  onComplete: PropTypes.func,
  requestStatus: PropTypes.string,
};

export const defaultProps = {
  onSignUp: noop,
  onComplete: noop,
};
