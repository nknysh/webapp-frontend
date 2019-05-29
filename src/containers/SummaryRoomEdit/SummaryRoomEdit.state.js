import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { updateBooking } from 'store/modules/booking/actions';
import {
  getBookingRoomDatesById,
  getBookingRoomMealPlans,
  getBookingErrorsByRoomId,
} from 'store/modules/booking/selectors';

import {
  getHotelRoomName,
  getHotelRoomRates,
  getHotelRoomOptions,
  getHotelProductAgeRanges,
} from 'store/modules/hotels/selectors';

export const mapStateToProps = (state, { hotelUuid, id }) => ({
  ageRanges: getHotelProductAgeRanges(state, id),
  dates: getBookingRoomDatesById(state, hotelUuid, id),
  name: getHotelRoomName(state, hotelUuid, id),
  rates: getHotelRoomRates(state, hotelUuid, id),
  options: getHotelRoomOptions(state, hotelUuid, id),
  mealPlans: getBookingRoomMealPlans(state, hotelUuid, id),
  errors: getBookingErrorsByRoomId(state, hotelUuid, id),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
