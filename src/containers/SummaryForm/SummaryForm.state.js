import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { updateBooking, removeRoom, replaceProducts } from 'store/modules/bookings/actions';
import {
  getBooking,
  getBookingTotals,
  getBookingTotal,
  getBookingReady,
  getBookingStatus,
  getBookingNonAccommodationErrors,
  isBookingOnRequest,
} from 'store/modules/bookings/selectors';

import { fetchHotelRoomRatesByDates } from 'store/modules/hotels/actions';

export const mapStateToProps = (state, { id }) => ({
  booking: getBooking(state, id),
  canBook: getBookingReady(state, id),
  status: getBookingStatus(state),
  totals: getBookingTotals(state, id),
  total: getBookingTotal(state, id),
  errors: getBookingNonAccommodationErrors(state, id),
  isOnRequest: isBookingOnRequest(state, id),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(
    updateBooking,
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
  replaceProducts: pipe(
    replaceProducts,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
