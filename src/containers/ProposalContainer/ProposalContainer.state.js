import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchProposal, updateProposal, removeBooking } from 'store/modules/proposals/actions';
import {
  getProposal,
  getProposalsStatus,
  getBookingsForProposal,
  getProposalsErrors,
} from 'store/modules/proposals/selectors';

export const mapStateToProps = (state, { id }) => ({
  proposal: getProposal(state, id),
  status: getProposalsStatus(state),
  bookings: getBookingsForProposal(state, id),
  errors: getProposalsErrors(state),
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
