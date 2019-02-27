import PropTypes from 'prop-types';

export const propTypes = {
  getUserFromToken: PropTypes.func,
};

export const defaultProps = {
  getUserFromToken: () => {},
};
