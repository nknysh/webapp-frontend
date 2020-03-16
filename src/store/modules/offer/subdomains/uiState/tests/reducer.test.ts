import { uiStateReducer as reducer } from '../reducer';
import { IOffer } from 'services/BackendApi';
import { initialState, IOfferUiState } from '../../../model';
import { getOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from 'store/modules/offer/actions';

describe('Offer reducer', () => {
  it('handles GET_OFFER_REQUEST correctly', () => {
    const action = getOfferRequestAction('123');
    const result = reducer(initialState.uiState, action);
    const expected: IOfferUiState = {
      ...initialState.uiState,
      getOfferRequestIsPending: true,
    };

    expect(result).toEqual(expected);
  });

  it('handles GET_OFFER_SUCCESS correctly', () => {
    const action = getOfferSuccessAction({ uuid: '1234' } as IOffer, {}, {}, [], true, []);
    const result = reducer(initialState.uiState, action);
    const expected: IOfferUiState = {
      ...initialState.uiState,
      getOfferRequestIsPending: false,
      isTextOnly: true,
    };
    expect(result).toEqual(expected);
  });

  it('handles GET_OFFER_FAILURE correctly', () => {
    const action = getOfferFailureAction('An error');

    const expected: IOfferUiState = {
      ...initialState.uiState,
      getError: 'An error',
      getOfferRequestIsPending: false,
    };

    const result = reducer(initialState.uiState, action);
    expect(result).toMatchObject(expected);
  });
});
