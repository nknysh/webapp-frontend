import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  fetchProposal,
  updateProposal,
  removeBooking,
  amendBooking,
  completeProposalBooking,
} from 'store/modules/proposals/actions';

import { getProposal, getProposalsStatus, getProposalBookings } from 'store/modules/proposals/selectors';

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
  updateProposal: pipe(
    updateProposal,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
