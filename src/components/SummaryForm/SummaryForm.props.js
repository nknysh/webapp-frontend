import PropTypes from 'prop-types';

export const propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  total: PropTypes.number,
  saving: PropTypes.number,
};

export const defaultProps = {
  name: 'Foo',
  total: 8462,
  saving: 1250,
};
