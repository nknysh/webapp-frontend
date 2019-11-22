import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  fetchCurrentHotelAccommodationProductDisplays,
  getCurrentHotelAccommodationProducts,
  getCurrentHotelAccommodationProductsError,
} from 'store/modules/hotelAccommodationProducts';

import {
  getBookingStatus,
  getBookingRooms,
  getBooking,
  getBookingCurrencySymbol,
  updateBooking,
  removeRoom,
  addRoom,
} from 'store/modules/bookings';

import { addLodgingAction } from 'store/modules/fastSearch';

export const mapStateToProps = (state, { hotelUuid }) => ({
  bookingStatus: getBookingStatus(state),
  booking: getBooking(state, hotelUuid),
  currencyCode: getBookingCurrencySymbol(state, hotelUuid),
  requestedRooms: getBookingRooms(state, hotelUuid),
  rooms: getCurrentHotelAccommodationProducts(state),
  roomsError: getCurrentHotelAccommodationProductsError(state),
});

export const mapDispatchToProps = dispatch => ({
  addRoom: pipe(
    addLodgingAction,
    dispatch
  ),
  addLodging: pipe(
    addLodgingAction,
    dispatch
  ),
  removeRoom: pipe(
    //TODO think this can be deleted?
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
