import PropTypes from 'prop-types';

export const propTypes = {
  featuredPhoto: PropTypes.object,
  name: PropTypes.string,
  preferred: PropTypes.bool,
  promotionalText: PropTypes.string,
  starRating: PropTypes.number,
  suitableForHoneymooners: PropTypes.bool,
  listPrice: PropTypes.string,
  additionalInfo: PropTypes.string,
  amenities: PropTypes.array,
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
};
