import { getOfferRequestIsPendingSelector, offerErrorSelector, offerSelector } from '../selectors';
import { initialState } from '../model';

describe('Offer Selectors', () => {
  describe('getOfferRequestPendingSelector', () => {
    it('Selects correctly', () => {
      expect(getOfferRequestIsPendingSelector.resultFunc(initialState)).toEqual(false);
    });
  });

  describe('offerErrorSelector', () => {
    it('Selects correctly', () => {
      expect(offerErrorSelector.resultFunc(initialState)).toEqual(null);
    });
  });

  describe('offerSelector', () => {
    it('Selects correctly', () => {
      expect(offerSelector.resultFunc(initialState)).toEqual(null);
    });
  });
});
