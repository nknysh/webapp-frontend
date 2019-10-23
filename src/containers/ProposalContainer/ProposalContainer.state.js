import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  fetchProposal,
  completeProposal,
  removeBooking,
  amendBooking,
  completeProposalBooking,
  proposalBookingRequest,
  proposalBookingHold,
  proposalBookingRelease,
  getProposal,
  getProposalsStatus,
  getProposalBookings,
} from 'store/modules/proposals';

export const mapStateToProps = (state, { id }) => ({
  proposal: getProposal(state, id),
  status: getProposalsStatus(state),
  bookings: getProposalBookings(state, id),
});

export const mapDispatchToProps = dispatch => ({
  fetchProposal: pipe(
    fetchProposal,
    dispatch
  ),
  completeProposal: pipe(
    completeProposal,
    dispatch
  ),
  removeBooking: pipe(
    removeBooking,
    dispatch
  ),
  amendBooking: pipe(
    amendBooking,
    dispatch
  ),
  completeProposalBooking: pipe(
    completeProposalBooking,
    dispatch
  ),
  proposalBookingRequest: pipe(
    proposalBookingRequest,
    dispatch
  ),
  proposalBookingHold: pipe(
    proposalBookingHold,
    dispatch
  ),
  proposalBookingRelease: pipe(
    proposalBookingRelease,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
