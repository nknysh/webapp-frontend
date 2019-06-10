import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotelsUploads, getHotelsAccommodationProducts } from 'store/modules/hotels/selectors';

import { updateBooking, removeRoom, addRoom } from 'store/modules/bookings/actions';
import { getBookingRooms, getBooking } from 'store/modules/bookings/selectors';

export const mapStateToProps = (state, { hotelUuid }) => ({
  getRoomUploads: ids => getHotelsUploads(state, ids),
  booking: getBooking(state, hotelUuid),
  requestedRooms: getBookingRooms(state, hotelUuid),
  rooms: getHotelsAccommodationProducts(state, hotelUuid),
});

export const mapDispatchToProps = dispatch => ({
  addRoom: pipe(
    addRoom,
    dispatch
  ),
  removeRoom: pipe(
    removeRoom,
    dispatch
  ),
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
