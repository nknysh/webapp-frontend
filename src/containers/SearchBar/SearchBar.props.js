import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  searchStatus: PropTypes.string,
  searchByName: PropTypes.func,
  setSearchQuery: PropTypes.func,
  getCountryName: PropTypes.func,
  getHotelName: PropTypes.func,
  searchQuery: PropTypes.object,
};

export const defaultProps = {
  getCountryName: noop,
  getHotelName: noop,
  searchByName: noop,
  setSearchQuery: noop,
  searchQuery: {},
};
