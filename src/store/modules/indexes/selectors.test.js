import { initialState } from 'store/common';

import { getIndexes } from './selectors';

const state = {
  indexes: {
    ...initialState,
    indexes: {
      hotels: {},
    },
  },
};

describe('indexes selectors', () => {
  describe('getIndexes', () => {
    it('returns the root key', () => {
      expect(getIndexes(state)).toEqual(state.indexes);
    });
  });
});
