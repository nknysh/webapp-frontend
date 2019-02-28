import { SEARCH_INDEX_BUILD, buildIndex } from './actions';

describe('search actions', () => {
  describe('buildIndex', () => {
    it('returns action', () => {
      expect(buildIndex({})).toEqual({
        type: SEARCH_INDEX_BUILD,
        payload: {},
      });
    });
  });
});
