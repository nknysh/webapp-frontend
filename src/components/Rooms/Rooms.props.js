import PropTypes from 'prop-types';

export const propTypes = {
  rooms: PropTypes.array,
  selectedRooms: PropTypes.object,
};

export const defaultProps = {
  rooms: [],
  selectedRooms: {},
};
