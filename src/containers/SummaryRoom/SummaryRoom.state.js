import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  getBookingRoomTotal,
  getPotentialBookingRoomsById,
  getBookingErrorsByRoomId,
  getBookingRoomsById,
  getBookingRoomDatesById,
  getBookingRoomHolds,
  getBookingRoomPhoto,
} from 'store/modules/bookings/selectors';
import { removeRoom } from 'store/modules/bookings/actions';

export const mapStateToProps = (state, { id, roomId }) => ({
  errors: getBookingErrorsByRoomId(state, id, roomId),
  requestedRooms: getBookingRoomsById(state, id, roomId),
  rooms: getPotentialBookingRoomsById(state, id, roomId),
  total: getBookingRoomTotal(state, id, roomId),
  dates: getBookingRoomDatesById(state, id, roomId),
  hold: getBookingRoomHolds(state, id, roomId),
  photo: getBookingRoomPhoto(state, id, roomId),
});

export const mapDispatchToProps = dispatch => ({
  removeRoom: pipe(
    removeRoom,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
