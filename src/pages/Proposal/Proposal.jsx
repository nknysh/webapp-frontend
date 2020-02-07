import React from 'react';
import { equals } from 'ramda';

import { ProposalContainer } from 'containers';

import { propTypes, defaultProps } from './Proposal.props';

export const Proposal = ({
  match: {
    params: { id, stage },
  },
}) => <ProposalContainer id={id} isEdit={['edit', 'review'].includes(stage)} isReview={stage === 'review'} />;

Proposal.propTypes = propTypes;
Proposal.defaultProps = defaultProps;

export default Proposal;
