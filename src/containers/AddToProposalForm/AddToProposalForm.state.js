import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { addToProposal, createNewProposal, fetchProposals } from 'store/modules/proposals/actions';
import { getProposalsKeyValue, getProposalsStatus, getProposalsResults } from 'store/modules/proposals/selectors';

export const mapStateToProps = state => ({
  status: getProposalsStatus(state),
  proposals: getProposalsKeyValue(state),
  result: getProposalsResults(state),
});

export const mapDispatchToProps = dispatch => ({
  addToProposal: pipe(
    addToProposal,
    dispatch
  ),
  createNewProposal: pipe(
    createNewProposal,
    dispatch
  ),
  fetchProposals: pipe(
    fetchProposals,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
