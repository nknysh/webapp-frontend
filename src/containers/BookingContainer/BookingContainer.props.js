import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  hotel: PropTypes.object,
  booking: PropTypes.object,
  updateBooking: PropTypes.func,
};

export const defaultProps = {
  hotel: {},
  booking: {},
  updateBooking: noop,
};
