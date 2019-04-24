import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  saving: PropTypes.number,
  hotel: PropTypes.object,
  booking: PropTypes.object,
  summaryOnly: PropTypes.bool,
  onBook: PropTypes.func,
};

export const defaultProps = {
  name: '',
  total: 0,
  hotel: {},
  booking: {},
  summaryOnly: false,
  onBook: noop,
};
