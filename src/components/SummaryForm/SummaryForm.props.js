import PropTypes from 'prop-types';

export const propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  saving: PropTypes.number,
  hotel: PropTypes.object,
  booking: PropTypes.object,
};

export const defaultProps = {
  name: 'Foo',
  total: 0,
  hotel: {},
  booking: {},
};
