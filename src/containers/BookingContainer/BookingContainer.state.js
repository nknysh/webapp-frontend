import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchBooking } from 'store/modules/bookings/actions';
import { getBooking, getBookingStatus } from 'store/modules/bookings/selectors';

export const mapStateToProps = (state, { id }) => ({
  booking: getBooking(state, id),
  status: getBookingStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchBooking: pipe(
    fetchBooking,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
