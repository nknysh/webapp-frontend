import { AsyncProposal, AsyncProposalList } from 'pages/async';

export default [
  {
    name: 'Proposal page',
    path: '/proposals/:id/:stage?',
    component: AsyncProposal,
    auth: true,
  },
  {
    name: 'Proposal list page',
    path: '/proposals',
    component: AsyncProposalList,
    auth: true,
  },
];
