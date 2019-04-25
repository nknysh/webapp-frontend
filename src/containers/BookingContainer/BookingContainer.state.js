import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { updateBooking } from 'store/modules/booking/actions';
import {
  getBookingByHotelId,
  getBookingTotal,
  getBookingRoomDatesById,
  getBookingRoomTotal,
  getBookingReady,
  getBookingRoomMealPlans,
  getBookingRoomMealPlan,
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
  hotel: getHotel(state, hotelUuid),
  total: getBookingTotal(state, hotelUuid),
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
