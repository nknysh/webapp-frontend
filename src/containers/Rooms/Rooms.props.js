import PropTypes from 'prop-types';

export const propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object),
  selectedRooms: PropTypes.object,
};

export const defaultProps = {
  rooms: [],
  selectedRooms: {},
};
