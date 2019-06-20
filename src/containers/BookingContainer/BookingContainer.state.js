import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  fetchBooking,
  clearCreatedBooking,
  requestBooking,
  holdBooking,
  releaseBooking,
} from 'store/modules/bookings/actions';
import { getBooking, getBookingStatus, getBookingCreatedByValue } from 'store/modules/bookings/selectors';

export const mapStateToProps = (state, { id }) => ({
  booking: getBooking(state, id),
  bookingStatus: getBookingStatus(state),
  created: getBookingCreatedByValue(state, id),
});

export const mapDispatchToProps = dispatch => ({
  fetchBooking: pipe(
    fetchBooking,
    dispatch
  ),
  clearCreatedBooking: pipe(
    clearCreatedBooking,
    dispatch
  ),
  requestBooking: pipe(
    requestBooking,
    dispatch
  ),
  holdBooking: pipe(
    holdBooking,
    dispatch
  ),
  releaseBooking: pipe(
    releaseBooking,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
