import { offer as reducer, accommodationProductsForHotelReducer } from '../reducer';
import { IOfferUI } from 'services/BackendApi';
import { initialState, IOfferModel, ECombinationMode, IHotelAvailableProducts } from '../model';
import { getOfferSuccessAction, getOfferFailureAction } from '../actions';
import { offerHotelUuidChangeSuccessAction, offerHotelUuidChangeAction } from '../subdomains/offer/actions';
import { IHotel } from 'services/BackendApi/types/HotelResponse';
import { IAccommodationProductForHotelItem } from '../../../../services/BackendApi/types/OfferResponse';

const emptyAvailableProducts = {} as IHotelAvailableProducts;

describe('Offer reducer', () => {
  it('handles GET_OFFER_SUCCESS correctly', () => {
    const action = getOfferSuccessAction({ uuid: '1234' } as IOfferUI, {}, {}, [], true, [], emptyAvailableProducts);
    const result = reducer(undefined, action);
    const expected: IOfferModel = {
      ...initialState,
      offer: { uuid: '1234' } as IOfferUI,
      uiState: {
        ...initialState.uiState,
        getOfferRequestIsPending: false,
        isTextOnly: true,
        combinationMode: ECombinationMode.COMBINES_WITH_NONE,
      },
    };
    expect(result).toEqual(expected);
  });

  it('handles GET_OFFER_SUCCESS correctly with some hotel accommodation products', () => {
    const action = getOfferSuccessAction(
      { uuid: '1234' } as IOfferUI,
      {},
      {},
      [],
      true,
      [
        {
          uuid: 'a',
          name: 'A',
          type: 'Accommodation',
        },
      ],
      emptyAvailableProducts
    );
    const result = reducer(undefined, action);
    const expected: IOfferModel = {
      ...initialState,
      offer: { uuid: '1234' } as IOfferUI,
      uiState: {
        ...initialState.uiState,
        getOfferRequestIsPending: false,
        isTextOnly: true,
        combinationMode: ECombinationMode.COMBINES_WITH_NONE,
      },
      accommodationProductsForHotel: [
        {
          uuid: 'a',
          name: 'A',
          type: 'Accommodation',
        } as IAccommodationProductForHotelItem,
      ],
    };
    expect(result).toEqual(expected);
  });
});

describe('accommodationProductsForHotelReducer', () => {
  it('handles OFFER_HOTEL_UUID_CHANGE_SUCCESS', () => {
    const fixture = {
      countryCode: 'MV',
      name: 'TEST',
      accommodationProducts: [
        {
          uuid: 'a',
          name: 'A',
          type: 'Accommodation',
        },
      ],
    } as IHotel;

    const action = offerHotelUuidChangeSuccessAction(fixture);
    const result = accommodationProductsForHotelReducer(initialState, action);
    const expected = fixture.accommodationProducts;
    expect(result).toEqual(expected);
  });
});
