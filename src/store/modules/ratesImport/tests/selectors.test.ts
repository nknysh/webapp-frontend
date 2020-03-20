import {
  importRatesRequestIsPendingSelector,
  errorSelector,
  latestStatusSelector,
  uiStateSelector,
  confirmationModalOpenSelector,
  workbookIdSelector
} from '../selectors';

import { initialState } from '../model';

describe('Rates Import Selectors', () => {

  describe('ratesImportDomainSelector', () => {
    it('selects correctly', () => {
      expect(importRatesRequestIsPendingSelector.resultFunc(initialState)).toEqual(false);
    });
  });

  describe('errorSelector', () => {
    it('selects correctly', () => {
      expect(errorSelector.resultFunc(initialState)).toEqual(null);
    });
  });

  describe('latestStatusSelector', () => {
    it('selects correctly', () => {
      expect(latestStatusSelector.resultFunc(initialState)).toEqual(null);
    });
  });

  describe('workbookIdSelector', () => {
    it('selects correctly', () => {
      expect(workbookIdSelector.resultFunc(initialState)).toEqual(null);
    });
  });

  describe('uiStateSelector', () => {
    it('selects correctly', () => {
      expect(uiStateSelector.resultFunc(initialState)).toEqual(initialState.uiState);
    });
  });

  describe('confirmationModalOpenSelector', () => {
    it('selects correctly', () => {
      expect(confirmationModalOpenSelector.resultFunc(initialState.uiState)).toEqual(false);
    });
  });

});