import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { updateBooking, updateRoom, updateIndividualRoom, addRoom, removeRoom } from 'store/modules/bookings/actions';
import {
  getBookingRoomDatesById,
  getBookingRoomMealPlans,
  getBookingErrorsByRoomId,
  getPotentialBookingRoomsById,
  getBookingRoomsById,
} from 'store/modules/bookings/selectors';

import { getHotelRoomName, getHotelRoomRates, getHotelRoomOptions } from 'store/modules/hotels/selectors';

import { fetchHotelRoomRatesByDates } from 'store/modules/hotels/actions';

export const mapStateToProps = (state, { id, roomId }) => ({
  dates: getBookingRoomDatesById(state, id, roomId),
  name: getHotelRoomName(state, id, roomId),
  rates: getHotelRoomRates(state, id, roomId),
  options: getHotelRoomOptions(state, id, roomId),
  mealPlans: getBookingRoomMealPlans(state, id, roomId),
  errors: getBookingErrorsByRoomId(state, id, roomId),
  rooms: getPotentialBookingRoomsById(state, id, roomId),
  requestedRooms: getBookingRoomsById(state, id, roomId),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
  updateRoom: pipe(
    updateRoom,
    dispatch
  ),
  updateIndividualRoom: pipe(
    updateIndividualRoom,
    dispatch
  ),
  addRoom: pipe(
    addRoom,
    dispatch
  ),
  removeRoom: pipe(
    removeRoom,
    dispatch
  ),
  getRatesForDates: pipe(
    fetchHotelRoomRatesByDates,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
