import PropTypes from 'prop-types';

export const propTypes = {
  srcs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  fallbackImage: PropTypes.string,
};

export const defaultProps = {
  srcs: [],
  fallbackImage: '',
};
