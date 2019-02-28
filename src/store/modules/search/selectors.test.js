import { getSearchIndexes } from './selectors';

const state = {
  search: {
    indexes: {
      foo: {},
    },
    query: undefined,
  },
};

describe('search selectors', () => {
  describe('getSearchIndexes', () => {
    it('returns the indexes', () => {
      expect(getSearchIndexes(state)).toBe(state.search.indexes);
    });
  });
});
