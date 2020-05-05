import {
  getPendingProposalsInfoRequestAction,
  getPendingProposalsInfoSuccessAction,
  getPendingProposalsInfoFailureAction
} from './actions';

describe('Pending Proposals actions', () => {
  it('Returns the correct object literals', () => {
    expect(getPendingProposalsInfoRequestAction()).toMatchSnapshot();
    expect(getPendingProposalsInfoSuccessAction(3)).toMatchSnapshot();
    expect(getPendingProposalsInfoFailureAction('Unknown Error')).toMatchSnapshot();
  });
});
