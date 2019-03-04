import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  setToken: PropTypes.func,
};

export const defaultProps = {
  setToken: noop,
};
