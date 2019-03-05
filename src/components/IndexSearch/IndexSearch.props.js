import PropTypes from 'prop-types';

export const propTypes = {
  children: PropTypes.func,
  disabled: PropTypes.bool,
  indexes: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  limit: PropTypes.number,
  openOnFocus: PropTypes.bool,
  pattern: PropTypes.string,
  value: PropTypes.string,
};

export const defaultProps = {
  indexes: [],
  value: '',
  pattern: '{search}*',
  openOnFocus: true,
};
