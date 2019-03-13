import PropTypes from 'prop-types';

export const propTypes = {
  isLoading: PropTypes.bool,
  showSpinner: PropTypes.bool,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export const defaultProps = {
  isLoading: true,
  children: null,
  showSpinner: true,
  text: undefined,
};
