import {
  importRequestIsPendingSelectorFactory,
  errorSelectorFactory,
  latestStatusSelectorFactory,
  uiStateSelectorFactory,
  confirmationModalOpenSelectorFactory,
  workbookIdSelectorFactory
} from '../selectors';

import { initialState } from '../model';

describe('Import Selectors', () => {
  const domainSelector = item => item;
  const invoke = factory => factory(domainSelector).resultFunc(initialState);

  describe('importRequestIsPendingSelector', () => {
    it('selects correctly', () => {
      expect(invoke(importRequestIsPendingSelectorFactory)).toEqual(false);
    });
  });

  describe('errorSelector', () => {
    it('selects correctly', () => {
      expect(invoke(errorSelectorFactory)).toEqual(null);
    });
  });

  describe('latestStatusSelector', () => {
    it('selects correctly', () => {
      expect(invoke(latestStatusSelectorFactory)).toEqual(null);
    });
  });

  describe('workbookIdSelector', () => {
    it('selects correctly', () => {
      expect(invoke(workbookIdSelectorFactory)).toEqual(null);
    });
  });

  describe('uiStateSelector', () => {
    it('selects correctly', () => {
      expect(invoke(uiStateSelectorFactory)).toEqual(initialState.uiState);
    });
  });

  describe('confirmationModalOpenSelector', () => {
    it('selects correctly', () => {
      expect(confirmationModalOpenSelectorFactory(domainSelector).resultFunc(initialState.uiState)).toEqual(false);
    });
  });

});