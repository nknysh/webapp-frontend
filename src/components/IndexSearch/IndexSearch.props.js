import PropTypes from 'prop-types';

export const propTypes = {
  children: PropTypes.func,
  disabled: PropTypes.bool,
  indexes: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  limit: PropTypes.number,
  openOnFocus: PropTypes.bool,
  searchPatterns: PropTypes.array,
  value: PropTypes.string,
};

export const defaultProps = {
  indexes: [],
  value: '',
  searchPatterns: [],
  openOnFocus: true,
};
