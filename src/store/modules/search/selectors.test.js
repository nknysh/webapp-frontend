import * as Selectors from './selectors';

const state = {
  search: {
    data: {
      hotels: {},
    },
    indexes: {
      foo: {},
    },
    query: undefined,
  },
};

describe('search selectors', () => {
  describe('getSearch', () => {
    it('returns the search key', () => {
      expect(Selectors.getSearch(state)).toMatchSnapshot();
    });
  });
  describe('getSearchQuery', () => {
    it('returns the search key', () => {
      expect(Selectors.getSearchQuery(state)).toMatchSnapshot();
    });
  });
  describe('getSearchValue', () => {
    it('returns the search key', () => {
      expect(Selectors.getSearchValue(state)).toMatchSnapshot();
    });
  });

  describe('priceRangeSelector', () => {
    // You don't need to mock the state to test a selector. Just test the resultFunc
    // like it's a a pure function, because it is.
    const priceRangeSelector = Selectors.priceRangeSelector.resultFunc;
    it('returns the prices property of the supplied object', () => {
      const filters = {
        prices: [1, 2],
      };
      expect(priceRangeSelector(filters)).toEqual([1, 2]);
    });

    it('returns an empty array if the supplied object has no prices property', () => {
      const filters = {};
      expect(priceRangeSelector(filters)).toEqual([]);
    });
  });

  describe('isSearchQueryValidSelector', () => {
    // You don't need to mock the state to test a selector. Just test the resultFunc
    // like it's a a pure function, because it is.
    const isSearchQueryValidSelector = Selectors.isSearchQueryValidSelector.resultFunc;

    it('returns true when range is valid and canSearch is true', () => {
      expect(isSearchQueryValidSelector([100, 200], true)).toEqual(true);
    });

    it('returns true when range is empty and canSearch is true', () => {
      expect(isSearchQueryValidSelector([], true)).toEqual(true);
    });

    it('returns false when range is invalid', () => {
      expect(isSearchQueryValidSelector([999, 0], true)).toEqual(false);
    });

    it('returns true when one value is empty or undefined', () => {
      // Min Set
      expect(isSearchQueryValidSelector([1, undefined], true)).toEqual(true);
      expect(isSearchQueryValidSelector([1, ''], true)).toEqual(true);
      // Max Set
      expect(isSearchQueryValidSelector([undefined, 1], true)).toEqual(true);
      expect(isSearchQueryValidSelector(['', 1], true)).toEqual(true);
    });

    it('returns false when only one value is set', () => {
      // Classic comment: This should never happen, so if it does,
      // you've got a bug somewhere else.
      expect(isSearchQueryValidSelector([1], false)).toEqual(false);
    });

    it('always returns false if canSearch is false', () => {
      expect(isSearchQueryValidSelector([100, 200], false)).toEqual(false);
      expect(isSearchQueryValidSelector([], false)).toEqual(false);
    });
  });
});
