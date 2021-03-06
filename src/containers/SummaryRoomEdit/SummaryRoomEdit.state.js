import { pipe } from 'ramda';
import { connect } from 'react-redux';

import {
  fetchHotelRoomRatesByDates,
  getHotelRoomName,
  getHotelRoomOptions,
  getHotelRoomRates,
} from 'store/modules/hotels';
import {
  addRoom,
  getBookingCurrencySymbol,
  getBookingErrorsByRoomId,
  getBookingRoomDatesById,
  getBookingRoomMealPlans,
  getBookingRoomsById,
  getPotentialBookingRoomsById,
  removeRoom,
  updateBooking,
  updateIndividualRoom,
  updateRoom,
  updateAccommodationProductGuestAgeSets,
  getAccommodationEditModalErrors,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { id, roomId }) => ({
  currencyCode: getBookingCurrencySymbol(state, id),
  dates: getBookingRoomDatesById(state, id, roomId),
  errors: getBookingErrorsByRoomId(state, id, roomId),
  mealPlans: getBookingRoomMealPlans(state, id, roomId),
  name: getHotelRoomName(state, id, roomId),
  options: getHotelRoomOptions(state, id, roomId),
  rates: getHotelRoomRates(state, id, roomId),
  requestedRooms: getBookingRoomsById(state, id, roomId),
  rooms: getPotentialBookingRoomsById(state, id, roomId),
  accommodationEditModalErrors: getAccommodationEditModalErrors(state, id, roomId),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(updateBooking, dispatch),
  updateRoom: pipe(updateRoom, dispatch),
  updateIndividualRoom: pipe(updateIndividualRoom, dispatch),
  updateAccommodationProductGuestAgeSets: pipe(updateAccommodationProductGuestAgeSets, dispatch),
  addRoom: pipe(addRoom, dispatch),
  removeRoom: pipe(removeRoom, dispatch),
  getRatesForDates: pipe(fetchHotelRoomRatesByDates, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
