import { uiStateReducer as reducer } from '../reducer';
import { IOfferUI } from 'services/BackendApi';
import { initialState, IOfferUiState, ECombinationMode } from '../../../model';
import { getOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from 'store/modules/offer/actions';
import { offerSetCombinationMode, offerToggleOfferInCombinationList } from '../actions';

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
    const action = getOfferSuccessAction({ uuid: '1234' } as IOfferUI, {}, {}, [], true, []);
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

describe('offer UI state reducer > set combination mode', () => {
  it('overwrites the combination state', () => {
    const fixture = {
      ...initialState.uiState,
    } as IOfferUiState;
    const action = offerSetCombinationMode(ECombinationMode.COMBINES_WITH_LIST);
    const result = reducer(fixture, action);
    expect(result).toMatchObject({
      ...initialState.uiState,
      combinationMode: 'COMBINES_WITH_LIST',
    });
  });
});

describe('offer UI state reducer > toggling combination list', () => {
  it('should add a new offer UUID to the list', () => {
    const fixture = {
      ...initialState.uiState,
    } as IOfferUiState;

    const action = offerToggleOfferInCombinationList('a', true);

    const result = reducer(fixture, action);

    expect(result).toMatchObject({
      ...initialState.uiState,
      combinationList: ['a'],
    });
  });

  it('should not add the same uuid twice', () => {
    const fixture = {
      ...initialState.uiState,
      combinationOfferUuids: ['a'],
    } as IOfferUiState;

    const action = offerToggleOfferInCombinationList('a', true);

    const result = reducer(fixture, action);

    expect(result).toMatchObject({
      ...initialState.uiState,
      combinationList: ['a'],
    });
  });

  it('should add a new one to the list', () => {
    const fixture = {
      ...initialState.uiState,
      combinationOfferUuids: ['a'],
    } as IOfferUiState;

    const action = offerToggleOfferInCombinationList('b', true);

    const result = reducer(fixture, action);

    expect(result).toMatchObject({
      ...initialState.uiState,
      combinationList: ['a', 'b'],
    });
  });

  it('remove one from the list when toggling off', () => {
    const fixture = {
      ...initialState.uiState,
      combinationOfferUuids: ['a', 'b', 'c'],
    } as IOfferUiState;

    const action = offerToggleOfferInCombinationList('b', false);

    const result = reducer(fixture, action);

    expect(result).toMatchObject({
      ...initialState.uiState,
      combinationList: ['a', 'c'],
    });
  });

  it('should not error when toggling off a uuid not in the list', () => {
    const fixture = {
      ...initialState.uiState,
      combinationOfferUuids: ['a', 'b', 'c'],
    } as IOfferUiState;

    const action = offerToggleOfferInCombinationList('d', false);

    const result = reducer(fixture, action);

    expect(result).toMatchObject({
      ...initialState.uiState,
      combinationList: ['a', 'b', 'c'],
    });
  });
});
