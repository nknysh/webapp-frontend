import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { updateBooking, checkBooking, removeRoom } from 'store/modules/booking/actions';
import {
  getBookingByHotelId,
  getBookingTotal,
  getBookingRoomDatesById,
  getBookingRoomTotal,
  getBookingReady,
  getBookingRoomMealPlans,
  getBookingRoomMealPlan,
  getBookingRoomExtraSupplements,
  getTransferProductsTotal,
} from 'store/modules/booking/selectors';

import { fetchHotelRoomRatesByDates } from 'store/modules/hotels/actions';
import { getHotel, getHotelRoom, getHotelProductAgeRanges, getHotelProducts } from 'store/modules/hotels/selectors';

export const mapStateToProps = (state, { hotelUuid }) => ({
  booking: getBookingByHotelId(state, hotelUuid),
  canBook: getBookingReady(state, hotelUuid),
  getAccommodationProductAgeRanges: getHotelProductAgeRanges('accommodationProducts', state),
  getHotelRoom: getHotelRoom(state, hotelUuid),
  getRoomDates: getBookingRoomDatesById(state, hotelUuid),
  getRoomMealPlan: getBookingRoomMealPlan(state, hotelUuid),
  getRoomMealPlans: getBookingRoomMealPlans(state, hotelUuid),
  getRoomTotal: getBookingRoomTotal(state, hotelUuid),
  getTransferProducts: getHotelProducts('transferProducts', state),
  getExtraSupplements: getBookingRoomExtraSupplements(state, hotelUuid),
  hotel: getHotel(state, hotelUuid),
  transfersTotal: getTransferProductsTotal(state, hotelUuid),
  total: getBookingTotal(state, hotelUuid),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
  checkBooking: pipe(
    checkBooking,
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
