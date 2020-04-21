import { IOfferUI, IOfferAPI } from 'services/BackendApi';
import { getOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from '../actions';
import { IHotelAvailableProducts } from '../model';

describe('Offer Actions', () => {
  it('...', () => {
    expect(getOfferRequestAction('123')).toMatchSnapshot();
    expect(
      getOfferSuccessAction(
        { uuid: '123' } as IOfferUI,
        { uuid: '123' } as IOfferAPI,
        {},
        {},
        [],
        true,
        [],
        {} as IHotelAvailableProducts
      )
    ).toMatchSnapshot();
    expect(getOfferFailureAction('An error')).toMatchSnapshot();
  });
});
