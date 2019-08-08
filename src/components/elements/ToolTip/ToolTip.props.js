import PropTypes from 'prop-types';

export const propTypes = {
  children: PropTypes.any,
  label: PropTypes.node,
  helpText: PropTypes.bool,
};

export const defaultProps = {
  helpText: false,
};
