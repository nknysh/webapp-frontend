import { ProposalsList, ProposalView } from 'pages';

export default [
  {
    name: 'Proposal View Path',
    path: '/proposals',
    auth: true,
    component: ProposalsList,
  },
  {
    name: 'Proposal View Path',
    path: '/proposals/:id',
    auth: true,
    component: ProposalView,
  },
];
