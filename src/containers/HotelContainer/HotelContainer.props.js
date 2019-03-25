import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  hotel: PropTypes.object,
  updateBooking: PropTypes.func,
};

export const defaultProps = {
  hotel: {},
  updateBooking: noop,
};
