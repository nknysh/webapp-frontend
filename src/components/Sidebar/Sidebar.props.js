import PropTypes from 'prop-types';

export const propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export const defaultProps = {
  links: [],
  isOpen: false,
};
