import {
  customItemSubdomainSelector,
  customItemPayloadSelector,
  customItemNameValidationSelector,
  customItemTotalValidationSelector,
  customItemValidationSelector
} from './selectors';

import { initialState } from '../../model';

describe('Custom Item Selectors', () => {

  describe('customItemSubdomainSelector', () => {
    it('selects correctly', () => {
      expect(customItemSubdomainSelector.resultFunc(initialState)).toEqual(initialState.customItem);
    });
  });

  describe('customItemPayloadSelector', () => {
    it('selects correctly', () => {
      expect(customItemPayloadSelector.resultFunc(initialState.customItem)).toEqual(null);
    });
  });

  describe('customItemNameValidationSelector', () => {
    it('validates correctly', () => {
      expect(customItemNameValidationSelector.resultFunc({ name: 'sample name' })).toEqual([]);
      expect(customItemNameValidationSelector.resultFunc({ name: '' })[0]).toBeDefined();
    });
  });

  describe('customItemTotalValidationSelector', () => {
    it('validates correctly', () => {
      expect(customItemTotalValidationSelector.resultFunc({ total: '10.00' })).toEqual([]);
      expect(customItemTotalValidationSelector.resultFunc({ total: '' })[0]).toBeDefined();
    });
  });

  describe('customItemValidationSelector', () => {
    it('validates correctly', () => {
      expect(customItemValidationSelector.resultFunc(['Required'], [])).toEqual({
        name: ['Required'],
        total: []
      });
    });
  });

});