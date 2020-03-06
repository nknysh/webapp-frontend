import { offer as reducer } from '../reducer';
import { getOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from '../actions';
import { IOffer } from 'services/BackendApi';
import { initialState, IOfferModel } from '../model';
import { getOfferRequestIsPendingSelector } from '../selectors';

describe('Offer reducer', () => {
  it('handles GET_OFFER_REQUEST correctly', () => {
    const action = getOfferRequestAction('123');
    const result = reducer(undefined, action);
    const expected: IOfferModel = {
      ...initialState,
      getOfferRequestIsPending: true,
    };

    expect(result).toEqual(expected);
  });

  it('handles GET_OFFER_SUCCESS correctly', () => {
    const action = getOfferSuccessAction({ uuid: '1234' } as IOffer, {}, {}, []);
    const result = reducer(undefined, action);
    const expected: IOfferModel = {
      ...initialState,
      offer: { uuid: '1234' } as IOffer,
      getOfferRequestIsPending: false,
    };
    expect(result).toEqual(expected);
  });

  it('handles GET_OFFER_FAILURE correctly', () => {
    const action = getOfferFailureAction('An error');

    const expected: IOfferModel = {
      ...initialState,
      error: 'An error',
      getOfferRequestIsPending: false,
    };

    const result = reducer(undefined, action);
    expect(result).toMatchObject(expected);
  });
});
