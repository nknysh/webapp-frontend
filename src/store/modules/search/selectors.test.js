import { getSearch, getSearchQuery, getSearchValue } from './selectors';

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
      expect(getSearch(state)).toMatchSnapshot();
    });
  });
  describe('getSearchQuery', () => {
    it('returns the search key', () => {
      expect(getSearchQuery(state)).toMatchSnapshot();
    });
  });
  describe('getSearchValue', () => {
    it('returns the search key', () => {
      expect(getSearchValue(state)).toMatchSnapshot();
    });
  });
});
