import { pipe } from 'ramda';
import { connect } from 'react-redux';

import {
  getBookingByHotelId,
  getBookingTotalByHotelId,
  getBookingRoomDatesById,
  getBookingRoomTotal,
  getBookingReady,
  getBookingRoomMealPlans,
  getBookingRoomMealPlan,
} from 'store/modules/booking/selectors';
import { fetchHotelRoomRatesByDates } from 'store/modules/hotels/actions';
import { getHotel, getHotelRoom, getAccommodationProductAgeRanges } from 'store/modules/hotels/selectors';
import { updateBooking } from 'store/modules/booking/actions';

export const mapStateToProps = (state, { hotelUuid }) => ({
  hotel: getHotel(state, hotelUuid),
  booking: getBookingByHotelId(state, hotelUuid),
  total: getBookingTotalByHotelId(state, hotelUuid),
  getHotelRoom: getHotelRoom(state, hotelUuid),
  getAccommodationProductAgeRanges: getAccommodationProductAgeRanges(state),
  getRoomDates: getBookingRoomDatesById(state, hotelUuid),
  getRoomTotal: getBookingRoomTotal(state, hotelUuid),
  getRoomMealPlans: getBookingRoomMealPlans(state, hotelUuid),
  getRoomMealPlan: getBookingRoomMealPlan(state, hotelUuid),
  canBook: getBookingReady(state, hotelUuid),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(
    updateBooking,
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
