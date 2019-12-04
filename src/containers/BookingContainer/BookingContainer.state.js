import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  clearCreatedBooking,
  completeBooking,
  fetchBooking,
  holdBooking,
  releaseBooking,
  requestBooking,
  reviewBooking,
  cancelBooking,
  getBooking,
  getBookingStatus,
  getBookingCreatedByValue,
  getBookingCreated,
  getBookingHolds,
  getBookingCurrencySymbol,
} from 'store/modules/bookings';

import { forwardsCompatBookingBuilderAction } from 'store/modules/bookingBuilder';

export const mapStateToProps = (state, { id }) => ({
  booking: getBooking(state, id),
  holds: getBookingHolds(state, id),
  bookingStatus: getBookingStatus(state),
  created: getBookingCreatedByValue(state, id),
  currencyCode: getBookingCurrencySymbol(state, id),

  amended: getBookingCreated(state, id),
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
  completeBooking: pipe(
    completeBooking,
    dispatch
  ),
  reviewBooking: pipe(
    reviewBooking,
    dispatch
  ),
  cancelBooking: pipe(
    cancelBooking,
    dispatch
  ),
  forwardsCompatBookingBuilderAction: pipe(
    forwardsCompatBookingBuilderAction,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
