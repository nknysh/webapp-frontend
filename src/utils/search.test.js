import { values } from 'ramda';
import lunr from 'lunr';

import { IndexTypes, RegionSelectTypes } from 'config/enums';

import { searchByQueries } from './search';

describe('search utils', () => {
  describe('IndexTypes', () => {
    it('should return index types correctly', () => {
      expect(values(IndexTypes)).toHaveLength(2);
      expect(IndexTypes.COUNTRIES).toEqual('countries');
      expect(IndexTypes.HOTELS).toEqual('hotels');
    });
    it('should be immutable', () => {
      expect(() => {
        IndexTypes.foo = 'bar';
      }).toThrow();
    });
  });
  describe('RegionSelectTypes', () => {
    it('should return region select types correctly', () => {
      expect(values(RegionSelectTypes)).toHaveLength(2);
      expect(RegionSelectTypes.SPECIFY).toEqual('specify');
      expect(RegionSelectTypes.ALL).toEqual('all');
    });
    it('should be immutable', () => {
      expect(() => {
        RegionSelectTypes.foo = 'bar';
      }).toThrow();
    });
  });

  describe('searchByQueries', () => {
    it('returns the result set based on querys', () => {
      const index = lunr(function() {
        this.ref('test');
        this.field('foo');
        this.add({ foo: 'one' });
        this.add({ foo: 'two' });
      });

      expect(searchByQueries(index, [])).toMatchSnapshot();
      expect(searchByQueries(index, ['foo:one'])).toMatchSnapshot();
      expect(searchByQueries(index, ['foo:two'])).toMatchSnapshot();
    });
  });
});
