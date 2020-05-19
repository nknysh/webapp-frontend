import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  setToken: PropTypes.func,
  isAppVersionDeprecated: PropTypes.bool,
};

export const defaultProps = {
  setToken: noop,
  isAppVersionDeprecated: false,
};
