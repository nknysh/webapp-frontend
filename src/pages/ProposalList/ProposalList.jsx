import React from 'react';

import { ProposalListContainer } from 'containers';

import { propTypes, defaultProps } from './ProposalList.props';

export const ProposalList = () => <ProposalListContainer />;

ProposalList.propTypes = propTypes;
ProposalList.defaultProps = defaultProps;

export default ProposalList;
