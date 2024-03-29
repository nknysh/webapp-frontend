import { initialState, IOfferUiState } from '../../../model';
import {
  getOfferRequestIsPendingSelector,
  getOfferErrorSelector,
  putOfferErrorSelector,
  postOfferErrorSelector,
  taCountryAccordianKeysSelector,
  combinationListSelector,
  orderedOffersListSelector,
} from '../selectors';
import { IOfferUI } from 'services/BackendApi';

describe('Offer UI State Selectors', () => {
  describe('getOfferRequestPendingSelector', () => {
    it('Selects correctly', () => {
      expect(getOfferRequestIsPendingSelector.resultFunc(initialState.uiState)).toEqual(false);
    });
  });

  describe('error selectors', () => {
    it('Selects correctly', () => {
      expect(getOfferErrorSelector.resultFunc(initialState.uiState)).toEqual(null);
      expect(putOfferErrorSelector.resultFunc(initialState.uiState)).toEqual(null);
      expect(postOfferErrorSelector.resultFunc(initialState.uiState)).toEqual(null);
    });
  });

  describe('taCountryAccordianKeysSelector', () => {
    it('Selects correctly', () => {
      const fixture: IOfferUiState = {
        taCountryAccordianKeys: ['1', '2', '3'],
      } as IOfferUiState;

      expect(taCountryAccordianKeysSelector.resultFunc(fixture)).toEqual(['1', '2', '3']);
    });
  });

  describe('combinationListSelector', () => {
    it('selects all the hotels with false if none in list', () => {
      const combinationListFixture = [];

      const offersOnHotelFixture = [
        {
          uuid: 'a',
          name: 'Offer A',
          order: 1,
        },
      ];

      const offerFixture = {
        uuid: 'b',
      } as IOfferUI;

      const result = combinationListSelector.resultFunc(combinationListFixture, offersOnHotelFixture, offerFixture);

      expect(result).toMatchObject([
        {
          label: 'Offer A',
          uuid: 'a',
          value: false,
        },
      ]);
    });

    it('selects hotels with true if their UUIDs are in the combination list', () => {
      const combinationListFixture = ['b', 'd'];

      const offersOnHotelFixture = [
        {
          uuid: 'a',
          name: 'Offer A',
          order: 1,
        },
        {
          uuid: 'b',
          name: 'Offer B',
          order: 2,
        },
        {
          uuid: 'c',
          name: 'Offer C',
          order: 3,
        },
        {
          uuid: 'd',
          name: 'Offer D',
          order: 4,
        },
      ];

      const offerFixture = {
        uuid: 'E',
      } as IOfferUI;

      const result = combinationListSelector.resultFunc(combinationListFixture, offersOnHotelFixture, offerFixture);

      expect(result).toMatchObject([
        {
          uuid: 'a',
          label: 'Offer A',
          value: false,
        },
        {
          uuid: 'b',
          label: 'Offer B',
          value: true,
        },
        {
          uuid: 'c',
          label: 'Offer C',
          value: false,
        },
        {
          uuid: 'd',
          label: 'Offer D',
          value: true,
        },
      ]);
    });

    it('gets offers for the combination list and filters out the offer were on', () => {
      const combinationListFixture = ['b', 'd'];

      const offersOnHotelFixture = [
        {
          uuid: 'a',
          name: 'Offer A',
          order: 1,
        },
        {
          uuid: 'b',
          name: 'Offer B',
          order: 2,
        },
        {
          uuid: 'c',
          name: 'Offer C',
          order: 3,
        },
        {
          uuid: 'd',
          name: 'Offer D',
          order: 4,
        },
      ];

      const offerFixture = {
        uuid: 'b',
      } as IOfferUI;

      const result = combinationListSelector.resultFunc(combinationListFixture, offersOnHotelFixture, offerFixture);

      expect(result).toMatchObject([
        {
          uuid: 'a',
          label: 'Offer A',
          value: false,
        },
        {
          uuid: 'c',
          label: 'Offer C',
          value: false,
        },
        {
          uuid: 'd',
          label: 'Offer D',
          value: true,
        },
      ]);
    });
  });

  describe('orderedOffersListSelector', () => {
    it('selects initial ordered offers list', () => {
      const fixture: IOfferUiState = {
        ...initialState.uiState,
      } as IOfferUiState;

      const result = orderedOffersListSelector.resultFunc(fixture);

      expect(result).toMatchObject([]);
    });

    it('selects ordered offers list', () => {
      const fixture: IOfferUiState = {
        ...initialState.uiState,
        orderedOffersList: [
          { uuid: 'a', name: 'A' },
          { uuid: 'b', name: 'B' },
        ],
      } as IOfferUiState;

      const result = orderedOffersListSelector.resultFunc(fixture);

      expect(result).toMatchObject([
        { uuid: 'a', name: 'A' },
        { uuid: 'b', name: 'B' },
      ]);
    });
  });
});
