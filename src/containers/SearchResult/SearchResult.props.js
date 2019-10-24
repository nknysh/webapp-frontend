import PropTypes from 'prop-types';

export const propTypes = {
  featuredPhoto: PropTypes.object,
  name: PropTypes.string,
  preferred: PropTypes.bool,
  promotionalText: PropTypes.string,
  starRating: PropTypes.string,
  suitableForHoneymooners: PropTypes.bool,
  listPrice: PropTypes.string,
  amenities: PropTypes.array,
  showDiscountedPrice: PropTypes.bool,
};

export const defaultProps = {
  featuredPhoto: {},
  name: '',
  preferred: false,
  promotionalText: '',
  suitableForHoneymooners: false,
  listPrice: '',
  additionalInfo: '',
  amenities: [],
  showDiscountedPrice: true,
};
