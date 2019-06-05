import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { updateBooking, removeRoom, updateBookingExtras } from 'store/modules/booking/actions';
import {
  getBookingByHotelId,
  getBookingTotals,
  getBookingTotal,
  getBookingReady,
  getBookingStatus,
  getBookingNonAccommodationErrors,
  isBookingOnRequest,
} from 'store/modules/booking/selectors';

import { fetchHotelRoomRatesByDates } from 'store/modules/hotels/actions';
import { getHotel } from 'store/modules/hotels/selectors';

export const mapStateToProps = (state, { hotelUuid }) => ({
  booking: getBookingByHotelId(state, hotelUuid),
  canBook: getBookingReady(state, hotelUuid),
  hotel: getHotel(state, hotelUuid),
  status: getBookingStatus(state),
  totals: getBookingTotals(state, hotelUuid),
  total: getBookingTotal(state, hotelUuid),
  errors: getBookingNonAccommodationErrors(state, hotelUuid),
  isOnRequest: isBookingOnRequest(state, hotelUuid),
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
