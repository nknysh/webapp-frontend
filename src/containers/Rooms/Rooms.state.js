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
} from 'store/modules/bookings';

import { lastExecutedQuerySelector } from 'store/modules/fastSearch';

import { offersQuerySelector } from 'store/modules/fastSearch';

import { addLodgingAction, bookingResponseLodgingCountsPerAccommodation } from 'store/modules/bookingBuilder';

export const mapStateToProps = (state, { hotelUuid }) => ({
  bookingStatus: getBookingStatus(state),
  booking: getBooking(state, hotelUuid),
  currencyCode: getBookingCurrencySymbol(state, hotelUuid),
  requestedRooms: getBookingRooms(state, hotelUuid),
  accommodationProducts: getCurrentHotelAccommodationProducts(state),
  roomsError: getCurrentHotelAccommodationProductsError(state),
  lodgingCountsPerAccommodation: bookingResponseLodgingCountsPerAccommodation(state),
  searchQuery: offersQuerySelector(state),
  lastExecutedQuery: lastExecutedQuerySelector(state),
});

export const mapDispatchToProps = dispatch => ({
  addRoom: pipe(addLodgingAction, dispatch),
  updateBooking: pipe(updateBooking, dispatch),
  fetchCurrentHotelAccommodationProductDisplays: pipe(fetchCurrentHotelAccommodationProductDisplays, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
