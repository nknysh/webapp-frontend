import PropTypes from 'prop-types';

export const propTypes = {
  children: PropTypes.any,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export const defaultProps = {};
