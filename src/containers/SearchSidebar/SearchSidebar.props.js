import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  searchQuery: PropTypes.object,
  indexes: PropTypes.array,
  hotels: PropTypes.object,
  destinations: PropTypes.object,
  getHotel: PropTypes.func,
  fetchDestinations: PropTypes.func,
  fetchHotels: PropTypes.func,
  getDestinationTitle: PropTypes.func,
};

export const defaultProps = {
  searchQuery: {},
  indexes: [],
  hotels: undefined,
  destinations: undefined,
  getHotel: noop,
  fetchDestinations: noop,
  fetchHotels: noop,
  getDestinationTitle: noop,
};
