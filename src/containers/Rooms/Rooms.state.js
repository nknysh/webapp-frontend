import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  fetchCurrentHotelAccommodationProductDisplays,
  getCurrentHotelAccommodationProducts,
  getCurrentHotelAccommodationProductsError,
} from 'store/modules/hotelAccommodationProducts';

import {
  getBookingRooms,
  getBooking,
  getBookingCurrencySymbol,
  updateBooking,
  removeRoom,
  addRoom,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { hotelUuid }) => ({
  booking: getBooking(state, hotelUuid),
  currencyCode: getBookingCurrencySymbol(state, hotelUuid),
  requestedRooms: getBookingRooms(state, hotelUuid),
  rooms: getCurrentHotelAccommodationProducts(state),
  roomsError: getCurrentHotelAccommodationProductsError(state),
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
  fetchCurrentHotelAccommodationProductDisplays: pipe(
    fetchCurrentHotelAccommodationProductDisplays,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
