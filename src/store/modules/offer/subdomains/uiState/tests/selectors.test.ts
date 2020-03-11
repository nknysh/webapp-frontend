import { initialState } from '../../../model';
import { getOfferRequestIsPendingSelector, offerErrorSelector } from '../selectors';

describe('Offer Selectors', () => {
  describe('getOfferRequestPendingSelector', () => {
    it('Selects correctly', () => {
      expect(getOfferRequestIsPendingSelector.resultFunc(initialState.uiState)).toEqual(true);
    });
  });

  describe('offerErrorSelector', () => {
    it('Selects correctly', () => {
      expect(offerErrorSelector.resultFunc(initialState.uiState)).toEqual(null);
    });
  });
});
