import { getQuery } from './location';

describe('location utils', () => {
  describe('getQuery', () => {
    it('returns search query string parsed', () => {
      const query = {
        search: 'foo=bar',
      };
      const expected = {
        foo: 'bar',
      };

      expect(getQuery(query)).toEqual(expected);
    });

    it('returns empty string if search does not exist', () => {
      expect(getQuery()).toEqual({});
      expect(getQuery({})).toEqual({});
      expect(getQuery({ notSearch: true })).toEqual({});
    });
  });
});
