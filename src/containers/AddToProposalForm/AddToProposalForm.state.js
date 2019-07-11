import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  addToProposal,
  createNewProposal,
  fetchProposals,
  getProposalsKeyValue,
  getProposalsStatus,
  getProposalsResults,
} from 'store/modules/proposals';

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
