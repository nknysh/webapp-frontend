import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  countries: PropTypes.object,
  fetchHotels: PropTypes.func,
  hotels: PropTypes.object,
  requesting: PropTypes.bool,
};

export const defaultProps = {
  countries: {},
  fetchHotels: noop,
  hotels: {},
  requesting: true,
};
