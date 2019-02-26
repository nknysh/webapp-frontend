import PropTypes from 'prop-types';

export const propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  full: PropTypes.bool,
  image: PropTypes.any,
  offsetBy: PropTypes.number,
};

export const defaultProps = {
  full: false,
  image: undefined,
  offsetBy: 0,
};
