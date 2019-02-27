import PropTypes from 'prop-types';

export const propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export const defaultProps = {
  isLoading: false,
  children: null,
};
