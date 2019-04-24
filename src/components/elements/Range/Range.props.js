import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export const defaultProps = {
  value: [],
  onChange: noop,
};
