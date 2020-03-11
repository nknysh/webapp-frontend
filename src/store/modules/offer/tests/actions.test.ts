import { IOffer } from 'services/BackendApi';
import { getOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from '../actions';

describe('Offer Actions', () => {
  it('...', () => {
    expect(getOfferRequestAction('123')).toMatchSnapshot();
    expect(
      getOfferSuccessAction(
        {
          uuid: '123',
        } as IOffer,
        {},
        {},
        [],
        true
      )
    ).toMatchSnapshot();
    expect(getOfferFailureAction('An error')).toMatchSnapshot();
  });
});
