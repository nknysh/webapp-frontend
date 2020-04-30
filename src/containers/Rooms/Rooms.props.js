import PropTypes from 'prop-types';

export const propTypes = {
  accommodationProducts: PropTypes.arrayOf(PropTypes.object),
  selectedRooms: PropTypes.object,
  bookingStatus: PropTypes.string,
};

export const defaultProps = {
  accommodationProducts: [],
  selectedRooms: {},
};
