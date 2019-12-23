import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  clearCreatedBooking,
  completeBooking,
  fetchBooking,
  requestBooking,
  reviewBooking,
  cancelBooking,
  getBooking,
  getBookingStatus,
  getBookingCreatedByValue,
  getBookingCreated,
  getBookingHolds,
  getBookingCurrencySymbol,
  addHoldToBooking,
  releaseHoldFromBooking,
} from 'store/modules/bookings';

import {
  forwardsCompatBookingBuilderAction,
  bookingPaymentTermsSelector,
  bookingCancellationPoliciesSelector,
  bookingOffersTermsSelector,
  updateBookingGuestInformationAction,
  bookingSelector,
} from 'store/modules/bookingBuilder';

import {
  addExistingBookingToProposal,
  createNewProposalWithExistingBooking,
  fetchProposals,
  getProposalsKeyValue,
  getProposalsStatus,
  getProposalsResults,
} from 'store/modules/proposals';

import { getUserCountryContext } from 'store/modules/auth';

export const mapStateToProps = (state, { id }) => ({
  booking: getBooking(state, id),
  newBooking: bookingSelector(state),
  holds: getBookingHolds(state, id),
  bookingStatus: getBookingStatus(state),
  created: getBookingCreatedByValue(state, id),
  amended: getBookingCreated(state, id),
  currencyCode: getBookingCurrencySymbol(state, id),
  paymentTerms: bookingPaymentTermsSelector(state),
  cancellationPolicy: bookingCancellationPoliciesSelector(state),
  offersTerms: bookingOffersTermsSelector(state),
  actingCountryCode: getUserCountryContext(state),

  // proposal things
  proposals: getProposalsKeyValue(state),
  proposalResult: getProposalsResults(state),
  proposalStatus: getProposalsStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchBooking: pipe(fetchBooking, dispatch),
  clearCreatedBooking: pipe(clearCreatedBooking, dispatch),
  requestBooking: pipe(requestBooking, dispatch),
  addHoldToBooking: pipe(addHoldToBooking, dispatch),
  releaseHoldFromBooking: pipe(releaseHoldFromBooking, dispatch),
  completeBooking: pipe(completeBooking, dispatch),
  reviewBooking: pipe(reviewBooking, dispatch),
  cancelBooking: pipe(cancelBooking, dispatch),
  forwardsCompatBookingBuilderAction: pipe(forwardsCompatBookingBuilderAction, dispatch),
  addToProposal: pipe(addExistingBookingToProposal, dispatch),
  updateBookingGuestInformationAction: pipe(updateBookingGuestInformationAction, dispatch),
  createNewProposal: pipe(createNewProposalWithExistingBooking, dispatch),
  fetchProposals: pipe(fetchProposals, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
