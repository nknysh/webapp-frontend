import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  searchQuery: PropTypes.object,
  indexes: PropTypes.array,
  hotels: PropTypes.object,
  countries: PropTypes.object,
  getHotel: PropTypes.func,
  fetchHotels: PropTypes.func,
  getCountryName: PropTypes.func,
};

export const defaultProps = {
  searchQuery: {},
  indexes: [],
  hotels: undefined,
  countries: undefined,
  getHotel: noop,
  fetchHotels: noop,
  getCountryName: noop,
};
