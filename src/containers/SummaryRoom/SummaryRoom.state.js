import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  getBookingErrorsByRoomId,
  getBookingRoomDatesById,
  getBookingRoomHolds,
  getBookingRoomOffers,
  getBookingRoomPhoto,
  getBookingRoomsById,
  getBookingRoomTotal,
  getBookingRoomTotalBeforeDiscount,
  getPotentialBookingRoomsById,
  removeRoom,
} from 'store/modules/bookings';
import { getHotelCurrencySymbol } from 'store/modules/hotels';

export const mapStateToProps = (state, { id, roomId }) => ({
  currencyCode: getHotelCurrencySymbol(state, id),
  dates: getBookingRoomDatesById(state, id, roomId),
  errors: getBookingErrorsByRoomId(state, id, roomId),
  hold: getBookingRoomHolds(state, id, roomId),
  offers: getBookingRoomOffers(state, id, roomId),
  photo: getBookingRoomPhoto(state, id, roomId),
  preDiscountTotal: getBookingRoomTotalBeforeDiscount(state, id, roomId),
  requestedRooms: getBookingRoomsById(state, id, roomId),
  rooms: getPotentialBookingRoomsById(state, id, roomId),
  total: getBookingRoomTotal(state, id, roomId),
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
