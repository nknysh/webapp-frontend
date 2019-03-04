import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  destinations: PropTypes.object,
  destinationsIndex: PropTypes.object,
  fetchDestinations: PropTypes.func,
  fetchHotels: PropTypes.func,
  getDestinationTitle: PropTypes.func,
  getHotelTitle: PropTypes.func,
  hotels: PropTypes.object,
  hotelsIndex: PropTypes.object,
  indexes: PropTypes.array,
};

export const defaultProps = {
  fetchDestinations: noop,
  fetchHotels: noop,
};
