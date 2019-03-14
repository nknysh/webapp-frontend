import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  countries: PropTypes.object,
  countriesIndex: PropTypes.object,
  fetchHotels: PropTypes.func,
  getCountryName: PropTypes.func,
  getHotelName: PropTypes.func,
  hotels: PropTypes.object,
  hotelsIndex: PropTypes.object,
  indexes: PropTypes.array,
};

export const defaultProps = {
  fetchHotels: noop,
};
