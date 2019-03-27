import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onRoomSelect: PropTypes.func,
  selectedRooms: PropTypes.object,
};

export const defaultProps = {
  onRoomSelect: noop,
  selectedRooms: {},
};
