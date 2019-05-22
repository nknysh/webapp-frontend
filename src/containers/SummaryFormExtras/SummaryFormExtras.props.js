import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  transfers: PropTypes.object,
  booking: PropTypes.object,
  groundServices: PropTypes.object,
  onChange: PropTypes.func,
};

export const defaultProps = {
  transfers: {},
  booking: {},
  groundServices: {},
  onChange: noop,
  total: 0,
};
