import { createSelector } from 'reselect';
import { proposalsListDomain } from '../../selectors';


export const pendingProposalsSubdomainSelector = createSelector(
  proposalsListDomain,
  domain => domain.pendingProposals
);

export const pendingProposalsRequestIsPendingSelector = createSelector(
  pendingProposalsSubdomainSelector,
  subdomain => subdomain.requestPending
);

export const pendingProposalsErrorSelector = createSelector(
  pendingProposalsSubdomainSelector,
  subdomain => subdomain.error
);

export const pendingProposalsCountSelector = createSelector(
  pendingProposalsSubdomainSelector,
  subdomain => subdomain.count
);
