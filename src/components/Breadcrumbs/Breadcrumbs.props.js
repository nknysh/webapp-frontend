import PropTypes from 'prop-types';

export const propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const defaultProps = {
  links: [],
};
