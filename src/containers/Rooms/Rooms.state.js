import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotelsUploads, getHotelsAccommodationProducts, getHotelCurrencySymbol } from 'store/modules/hotels';
import { getBookingRooms, getBooking, updateBooking, removeRoom, addRoom } from 'store/modules/bookings';

export const mapStateToProps = (state, { hotelUuid }) => ({
  booking: getBooking(state, hotelUuid),
  currencyCode: getHotelCurrencySymbol(state, hotelUuid),
  getRoomUploads: ids => getHotelsUploads(state, ids),
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
