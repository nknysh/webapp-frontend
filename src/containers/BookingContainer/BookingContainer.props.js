import PropTypes from 'prop-types';

export const propTypes = {
  booking: PropTypes.object,
  isDetails: PropTypes.bool,
};

export const defaultProps = {
  isDetails: false,
  booking: {},
};
