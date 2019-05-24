import { connect } from 'react-redux';

import {
  getPotentialDatesByRoomId,
  getBookingRoomTotal,
  getPotentialBookingRoomMealPlans,
  getPotentialBookingRoomSupplements,
  getPotentialBookingByRoomId,
} from 'store/modules/booking/selectors';
import { getHotelRoom, getHotelProductAgeRanges, getHotelsRoomsPhotos } from 'store/modules/hotels/selectors';

export const mapStateToProps = (state, { hotelUuid, id }) => ({
  ageRanges: getHotelProductAgeRanges(state, id),
  dates: getPotentialDatesByRoomId(state, hotelUuid, id),
  details: getHotelRoom(state, hotelUuid, id),
  supplements: getPotentialBookingRoomSupplements(state, hotelUuid, id),
  mealPlans: getPotentialBookingRoomMealPlans(state, hotelUuid, id),
  total: getBookingRoomTotal(state, hotelUuid, id),
  photos: getHotelsRoomsPhotos(state, hotelUuid, id),
  potentialBooking: getPotentialBookingByRoomId(state, hotelUuid, id),
});

export default connect(mapStateToProps);
