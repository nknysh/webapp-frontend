import { offer as reducer } from '../reducer';
import { IOffer } from 'services/BackendApi';
import { initialState, IOfferModel } from '../model';
import { getOfferSuccessAction, getOfferFailureAction } from '../actions';

describe('Offer reducer', () => {
  it('handles GET_OFFER_SUCCESS correctly', () => {
    const action = getOfferSuccessAction({ uuid: '1234' } as IOffer, {}, {}, [], true);
    const result = reducer(undefined, action);
    const expected: IOfferModel = {
      ...initialState,
      offer: { uuid: '1234' } as IOffer,
      uiState: {
        ...initialState.uiState,
        getOfferRequestIsPending: false,
        isTextOnly: true,
      },
    };
    expect(result).toEqual(expected);
  });
});
