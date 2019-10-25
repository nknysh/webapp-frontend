import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  getBookingCurrencySymbol,
  getBookingErrorsByRoomId,
  getBookingRoomDatesById,
  getBookingRoomHolds,
  getBookingRoomOffers,
  getBookingRoomPhoto,
  getBookingRoomsById,
  getBookingRoomsByIdIsOnRequest,
  getBookingRoomTotal,
  getBookingRoomTotalBeforeDiscount,
  getPotentialBookingRoomsById,
  removeRoom,
  getHasUnusedAvailableMealPlanOffers,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { id, roomId }) => ({
  currencyCode: getBookingCurrencySymbol(state, id),
  dates: getBookingRoomDatesById(state, id, roomId),
  errors: getBookingErrorsByRoomId(state, id, roomId),
  hold: getBookingRoomHolds(state, id, roomId),
  isOnRequest: getBookingRoomsByIdIsOnRequest(state, id, roomId),
  offers: getBookingRoomOffers(state, id, roomId),
  photo: getBookingRoomPhoto(state, id, roomId),
  preDiscountTotal: getBookingRoomTotalBeforeDiscount(state, id, roomId),
  requestedRooms: getBookingRoomsById(state, id, roomId),
  rooms: getPotentialBookingRoomsById(state, id, roomId),
  total: getBookingRoomTotal(state, id, roomId),
  hasUnusedAvailableMealPlanOffers: getHasUnusedAvailableMealPlanOffers(state, id, roomId),
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
