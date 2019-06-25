import PropTypes from 'prop-types';

export const propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  data: PropTypes.array,
};

export const defaultProps = {
  children: [],
  data: [],
};
