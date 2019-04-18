import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  countries: PropTypes.object,
  fetchHotels: PropTypes.func,
  fetchLatestOffers: PropTypes.func,
  hotels: PropTypes.object,
  offers: PropTypes.array,
  requesting: PropTypes.bool,
};

export const defaultProps = {
  countries: {},
  fetchHotels: noop,
  fetchLatestOffers: noop,
  hotels: {},
  offers: [],
  requesting: true,
};
