import { initialState } from '../../../model';
import {
  getOfferRequestIsPendingSelector,
  getOfferErrorSelector,
  putOfferErrorSelector,
  postOfferErrorSelector,
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
});
