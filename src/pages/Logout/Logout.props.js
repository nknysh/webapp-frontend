import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  logOut: PropTypes.func,
};

export const defaultProps = {
  logOut: noop,
};
