import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onRoomAdd: PropTypes.func,
  onRoomRemove: PropTypes.func,
  selectedRooms: PropTypes.object,
};

export const defaultProps = {
  onRoomAdd: noop,
  onRoomRemove: noop,
  selectedRooms: {},
};
