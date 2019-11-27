import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel, getHotelsBrochures, getHotelsPhotos } from 'store/modules/hotels';
import { fetchHotel } from 'store/modules/hotel';
import { addRoom, getBooking, removeRoom, updateBooking } from 'store/modules/bookings';

import {
  bookingCanBookSelector,
  bookingCanHoldSelector,
  bookingPaymentTermsSelector,
  bookingCancellationPoliciesSelector,
  bookingOffersTermsSelector,
} from 'store/modules/fastSearch';
import { initializeBookingBuilderAction } from 'store/modules/bookingBuilder/actions';

export const mapStateToProps = (state, { id }) => ({
  booking: getBooking(state, id),
  brochures: getHotelsBrochures(state, id),
  canBook: bookingCanBookSelector(state),
  canHold: bookingCanHoldSelector(state),
  hotel: getHotel(state, id),
  photos: getHotelsPhotos(state, id),
  paymentTerms: bookingPaymentTermsSelector(state),
  cancellationPolicy: bookingCancellationPoliciesSelector(state),
  offersTerms: bookingOffersTermsSelector(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotel: pipe(
    fetchHotel,
    dispatch
  ),
  addRoom: pipe(
    addRoom,
    dispatch
  ),
  removeRoom: pipe(
    removeRoom,
    dispatch
  ),
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
  initializeBooking: pipe(
    initializeBookingBuilderAction,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
