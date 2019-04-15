import PropTypes from 'prop-types';

export const propTypes = {
  centered: PropTypes.bool,
  labels: PropTypes.array,
  current: PropTypes.number,
};

export const defaultProps = {
  labels: [],
  current: 0,
};
