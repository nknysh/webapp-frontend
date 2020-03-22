import { initialState, IOfferUiState } from '../../../model';
import {
  getOfferRequestIsPendingSelector,
  getOfferErrorSelector,
  putOfferErrorSelector,
  postOfferErrorSelector,
  taCountryAccordianKeysSelector,
} from '../selectors';

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
});
