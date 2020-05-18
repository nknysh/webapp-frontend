import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel, getHotelsBrochures, getHotelsPhotos } from 'store/modules/hotels';
import { fetchHotel } from 'store/modules/hotel';
import { addRoom, removeRoom, updateBooking } from 'store/modules/bookings';

import {
  initializeBookingBuilderAction,
  resetBookingBuilderUiStateAction,
  bookingCanBookSelector,
  bookingCanHoldSelector,
  bookingPaymentTermsSelector,
  bookingCancellationPoliciesSelector,
  bookingOffersTermsSelector,
  bookingBuilderSelector,
} from 'store/modules/bookingBuilder';

import {
  addToProposal,
  createNewProposal,
  fetchProposals,
  getProposalsKeyValue,
  getProposalsStatus,
  getProposalsResults,
} from 'store/modules/proposals';

import { getUserCountryContext } from 'store/modules/auth';

export const mapStateToProps = (state, { id }) => ({
  booking: bookingBuilderSelector(state),
  brochures: getHotelsBrochures(state, id),
  canBook: bookingCanBookSelector(state),
  canHold: bookingCanHoldSelector(state),
  hotel: getHotel(state, id),
  photos: getHotelsPhotos(state, id),
  paymentTerms: bookingPaymentTermsSelector(state),
  cancellationPolicy: bookingCancellationPoliciesSelector(state),
  offersTerms: bookingOffersTermsSelector(state),
  proposals: getProposalsKeyValue(state),
  proposalResult: getProposalsResults(state),
  proposalStatus: getProposalsStatus(state),
  actingCountryCode: getUserCountryContext(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotel: pipe(fetchHotel, dispatch),
  addRoom: pipe(addRoom, dispatch),
  removeRoom: pipe(removeRoom, dispatch),
  updateBooking: pipe(updateBooking, dispatch),
  initializeBooking: pipe(initializeBookingBuilderAction, dispatch),
  addToProposal: pipe(addToProposal, dispatch),
  createNewProposal: pipe(createNewProposal, dispatch),
  fetchProposals: pipe(fetchProposals, dispatch),
  resetBookingBuilderUiState: pipe(resetBookingBuilderUiStateAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
