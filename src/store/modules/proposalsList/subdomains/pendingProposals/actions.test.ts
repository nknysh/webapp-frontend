import {
  getPendingProposalsCountRequestAction,
  getPendingProposalsCountSuccessAction,
  getPendingProposalsCountFailureAction
} from './actions';

describe('Pending Proposals actions', () => {
  it('Returns the correct object literals', () => {
    expect(getPendingProposalsCountRequestAction()).toMatchSnapshot();
    expect(getPendingProposalsCountSuccessAction(3)).toMatchSnapshot();
    expect(getPendingProposalsCountFailureAction('Unknown Error')).toMatchSnapshot();
  });
});
