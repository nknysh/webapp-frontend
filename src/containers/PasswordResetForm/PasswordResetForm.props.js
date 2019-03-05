import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onReset: PropTypes.func,
  requestStatus: PropTypes.string,
};

export const defaultProps = {
  onReset: noop,
};
