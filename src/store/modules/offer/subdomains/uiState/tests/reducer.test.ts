import { uiStateReducer as reducer } from '../reducer';
import { IOfferUI, IHotel } from 'services/BackendApi';
import { initialState, IOfferUiState, ECombinationMode, IHotelAvailableProducts } from '../../../model';
import {
  getOfferRequestAction,
  getOfferSuccessAction,
  getOfferFailureAction,
  postOffersOrderRequestAction,
  postOffersOrderSuccessAction,
  postOffersOrderFailureAction,
  offerHotelUuidChangeSuccessAction,
} from 'store/modules/offer/actions';

import { offerSetCombinationMode, offerToggleOfferInCombinationList, setOrderedOffersListAction } from '../actions';
import { mockOffersOrderingData } from '../../../tests/mock';

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
    const action = getOfferSuccessAction(
      { uuid: '1234' } as IOfferUI,
      {},
      {},
      mockOffersOrderingData.basic.offersOnHotel,
      true,
      [],
      {} as IHotelAvailableProducts
    );
    const result = reducer(initialState.uiState, action);
    const expected: IOfferUiState = {
      ...initialState.uiState,
      getOfferRequestIsPending: false,
      isTextOnly: true,
      combinationMode: ECombinationMode.COMBINES_WITH_NONE,
      orderedOffersList: mockOffersOrderingData.basic.orderedOffers,
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

  it('handles POST_OFFERS_ORDER_REQUEST correctly', () => {
    const action = postOffersOrderRequestAction([]);

    const expected: IOfferUiState = {
      ...initialState.uiState,
      postOffersOrderRequestIsPending: true,
    };

    const result = reducer(initialState.uiState, action);
    expect(result).toMatchObject(expected);
  });

  it('handles POST_OFFERS_ORDER_SUCCESS correctly', () => {
    const { basic } = mockOffersOrderingData;
    const action = postOffersOrderSuccessAction(basic.offersOnHotel);

    const expected: IOfferUiState = {
      ...initialState.uiState,
      postOffersOrderRequestIsPending: false,
      postOffersOrderError: null,
      orderedOffersList: basic.orderedOffers,
    };

    const result = reducer(initialState.uiState, action);
    expect(result).toMatchObject(expected);
  });

  it('handles POST_OFFERS_ORDER_FAILURE correctly', () => {
    const errors = [
      {
        id: 'UNKNOWN',
        status: 'FAIL',
        title: 'Unknown Error',
        detail: 'Details of the error',
        meta: { errors: [], stack: 'stack' },
      },
    ];

    const action = postOffersOrderFailureAction(errors);

    const expected: IOfferUiState = {
      ...initialState.uiState,
      postOffersOrderRequestIsPending: false,
      postOffersOrderError: errors,
    };

    const result = reducer(initialState.uiState, action);
    expect(result).toMatchObject(expected);
  });

  it('handles OFFER_HOTEL_UUID_CHANGE_SUCCESS correctly', () => {
    const { basic } = mockOffersOrderingData;
    const action = offerHotelUuidChangeSuccessAction({
      offers: basic.offersOnHotel,
    } as IHotel);

    const expected: IOfferUiState = {
      ...initialState.uiState,
      orderedOffersList: [
        ...basic.orderedOffers,
        {
          uuid: initialState.offer.uuid,
          name: initialState.offer.name,
        },
      ],
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
      combinationOfferUuids: ['a'],
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
      combinationOfferUuids: ['a'],
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
      combinationOfferUuids: ['a', 'b'],
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
      combinationOfferUuids: ['a', 'c'],
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
      combinationOfferUuids: ['a', 'b', 'c'],
    });
  });
});

describe('offer GET_OFFER_SUCCESS handling combines data', () => {
  it('with combines true combinesWith is empty and cannotCombineWith is empty', () => {
    const action = getOfferSuccessAction(
      {
        ...initialState.offer,
        combines: true,
        combinesWith: [],
        cannotCombineWith: [],
      } as IOfferUI,
      {},
      {},
      [],
      true,
      [],
      {} as IHotelAvailableProducts
    );

    const result = reducer(initialState.uiState, action);
    const expected: IOfferUiState = {
      ...initialState.uiState,
      getOfferRequestIsPending: false,
      isTextOnly: true,
      combinationMode: ECombinationMode.COMBINES_WITH_ANY,
    };
    expect(result).toEqual(expected);
  });

  it('with combines true combinesWith has entries and cannotCombineWith is empty', () => {
    const action = getOfferSuccessAction(
      {
        ...initialState.offer,
        combines: true,
        combinesWith: ['a'],
        cannotCombineWith: [],
      } as IOfferUI,
      {},
      {},
      [],
      true,
      [],
      {} as IHotelAvailableProducts
    );

    const result = reducer(initialState.uiState, action);
    const expected: IOfferUiState = {
      ...initialState.uiState,
      getOfferRequestIsPending: false,
      isTextOnly: true,
      combinationMode: ECombinationMode.COMBINES_WITH_LIST,
      combinationOfferUuids: ['a'],
    };
    expect(result).toEqual(expected);
  });

  it('with combines true combinesWith is empty and cannotCombineWith has entries', () => {
    const action = getOfferSuccessAction(
      {
        ...initialState.offer,
        combines: true,
        combinesWith: [],
        cannotCombineWith: ['b'],
      } as IOfferUI,
      {},
      {},
      [],
      true,
      [],
      {} as IHotelAvailableProducts
    );

    const result = reducer(initialState.uiState, action);
    const expected: IOfferUiState = {
      ...initialState.uiState,
      getOfferRequestIsPending: false,
      isTextOnly: true,
      combinationMode: ECombinationMode.CANNOT_COMBINE_WITH_LIST,
      combinationOfferUuids: ['b'],
    };
    expect(result).toEqual(expected);
  });

  it('with combines false combinesWith has values and cannotCombineWith is empty', () => {
    const action = getOfferSuccessAction(
      {
        ...initialState.offer,
        combines: false,
        combinesWith: ['a'],
        cannotCombineWith: [],
      } as IOfferUI,
      {},
      {},
      [],
      true,
      [],
      {} as IHotelAvailableProducts
    );

    const result = reducer(initialState.uiState, action);
    const expected: IOfferUiState = {
      ...initialState.uiState,
      getOfferRequestIsPending: false,
      isTextOnly: true,
      combinationMode: ECombinationMode.COMBINES_WITH_NONE,
      combinationOfferUuids: [],
    };
    expect(result).toEqual(expected);
  });
});

describe('handle SET_ORDERED_OFFERS_LIST', () => {
  it('set the list from an array', () => {
    const fixture = {
      ...initialState.uiState,
    } as IOfferUiState;

    const action = setOrderedOffersListAction([
      {
        uuid: 'a',
        name: 'A',
      },
      {
        uuid: 'b',
        name: 'B',
      },
    ]);
    const result = reducer(fixture, action);
    expect(result).toMatchObject({
      ...initialState.uiState,
      orderedOffersList: [
        {
          uuid: 'a',
          name: 'A',
        },
        {
          uuid: 'b',
          name: 'B',
        },
      ],
    });
  });

  it('set the list to an empty array', () => {
    const fixture = {
      ...initialState.uiState,
    } as IOfferUiState;

    const action = setOrderedOffersListAction([]);
    const result = reducer(fixture, action);
    expect(result).toMatchObject({
      ...initialState.uiState,
      orderedOffersList: [],
    });
  });
});
