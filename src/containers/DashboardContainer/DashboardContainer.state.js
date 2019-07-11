import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchBookings, getBookingStatus, getBookingsForDashboard } from 'store/modules/bookings';

export const mapStateToProps = state => ({
  bookingsStatus: getBookingStatus(state),
  bookings: getBookingsForDashboard(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchBookings: pipe(
    fetchBookings,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
