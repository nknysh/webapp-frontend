import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  centered: PropTypes.bool,
  labels: PropTypes.array,
  current: PropTypes.number,
  onChange: PropTypes.func,
  onTabScrollButtonChange: PropTypes.func,
};

export const defaultProps = {
  labels: [],
  value: 0,
  onChange: noop,
  onTabScrollButtonChange: noop,
};
