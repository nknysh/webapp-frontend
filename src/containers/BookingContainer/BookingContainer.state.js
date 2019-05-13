import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { updateBooking, checkBooking, removeRoom, updateBookingExtras } from 'store/modules/booking/actions';
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
  getGroundServiceProductsTotal,
} from 'store/modules/booking/selectors';

import { fetchHotelRoomRatesByDates } from 'store/modules/hotels/actions';
import {
  getHotel,
  getHotelRoom,
  getHotelProductAgeRanges,
  getHotelProducts,
  getHotelsRate,
} from 'store/modules/hotels/selectors';

export const mapStateToProps = (state, { hotelUuid }) => ({
  booking: getBookingByHotelId(state, hotelUuid),
  canBook: getBookingReady(state, hotelUuid),
  getAccommodationProductAgeRanges: getHotelProductAgeRanges(state),
  getHotelRoom: getHotelRoom(state, hotelUuid),
  getRoomDates: getBookingRoomDatesById(state, hotelUuid),
  getRoomMealPlan: getBookingRoomMealPlan(state, hotelUuid),
  getRoomMealPlans: getBookingRoomMealPlans(state, hotelUuid),
  getRoomTotal: getBookingRoomTotal(state, hotelUuid),
  transferProducts: getHotelProducts(state, hotelUuid, 'transferProducts'),
  groundServiceProducts: getHotelProducts(state, hotelUuid, 'groundServiceProducts'),
  getRate: getHotelsRate(state),
  getExtraSupplements: getBookingRoomExtraSupplements(state, hotelUuid),
  hotel: getHotel(state, hotelUuid),
  transfersTotal: getTransferProductsTotal(state, hotelUuid),
  groundServicesTotal: getGroundServiceProductsTotal(state, hotelUuid),
  total: getBookingTotal(state, hotelUuid),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
  updateBookingExtras: pipe(
    updateBookingExtras,
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
