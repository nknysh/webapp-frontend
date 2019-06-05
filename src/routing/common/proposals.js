import { AsyncProposal } from 'pages/async';

export default [
  {
    name: 'Proposal page',
    path: '/proposals/:id/:stage?',
    component: AsyncProposal,
    auth: true,
  },
];
