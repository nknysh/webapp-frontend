import {
  getPendingProposalsInfoRequestAction,
  getPendingProposalsInfoSuccessAction,
  getPendingProposalsInfoFailureAction
} from './actions';

describe('Pending Proposals actions', () => {
  it('Returns the correct object literals', () => {
    expect(getPendingProposalsInfoRequestAction()).toMatchSnapshot();
    
    const latest = {
      uuid: '123',
      guestTitle: 'Mr',
      guestFirstName: 'John',
      guestLastName: 'Smith'
    };
    expect(getPendingProposalsInfoSuccessAction(3, latest)).toMatchSnapshot();
    expect(getPendingProposalsInfoFailureAction('Unknown Error')).toMatchSnapshot();
  });
});
