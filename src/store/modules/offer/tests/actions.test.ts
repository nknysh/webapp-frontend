import { getOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from '../actions';
import { IOffer } from 'services/BackendApi';

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
        []
      )
    ).toMatchSnapshot();
    expect(getOfferFailureAction('An error')).toMatchSnapshot();
  });
});
