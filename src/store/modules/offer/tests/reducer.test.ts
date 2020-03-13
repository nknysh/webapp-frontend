import { offer as reducer } from '../reducer';
import { IOffer } from 'services/BackendApi';
import { initialState, IOfferModel } from '../model';
import { getOfferSuccessAction, getOfferFailureAction } from '../actions';

describe('Offer reducer', () => {
  it('handles GET_OFFER_SUCCESS correctly', () => {
    const action = getOfferSuccessAction({ uuid: '1234' } as IOffer, {}, {}, [], true, []);
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

  it('handles GET_OFFER_SUCCESS correctly with some hotel accommodation products', () => {
    const action = getOfferSuccessAction({ uuid: '1234' } as IOffer, {}, {}, [], true, [
      {
        uuid: 'a',
        name: 'A',
        type: 'Accommodation',
      },
    ]);
    const result = reducer(undefined, action);
    const expected: IOfferModel = {
      ...initialState,
      offer: { uuid: '1234' } as IOffer,
      uiState: {
        ...initialState.uiState,
        getOfferRequestIsPending: false,
        isTextOnly: true,
      },
      accommodationProductsForHotel: [
        {
          uuid: 'a',
          name: 'A',
          type: 'Accommodation',
        },
      ],
    };
    expect(result).toEqual(expected);
  });
});
