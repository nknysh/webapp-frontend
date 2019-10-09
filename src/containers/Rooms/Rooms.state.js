import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotelsUploads, getHotelsAccommodationProducts } from 'store/modules/hotels';
import {
  getBookingRooms,
  getBooking,
  getBookingCurrencySymbol,
  updateBooking,
  removeRoom,
  addRoom,
} from 'store/modules/bookings';
import { fetchHotelWithAccommodationProducts } from 'store/modules/hotel';

export const mapStateToProps = (state, { hotelUuid }) => ({
  booking: getBooking(state, hotelUuid),
  currencyCode: getBookingCurrencySymbol(state, hotelUuid),
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
  fetchHotelWithAccommodationProducts: pipe(
    fetchHotelWithAccommodationProducts,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
