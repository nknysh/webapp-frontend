import { values, prop, __ } from 'ramda';
import lunr from 'lunr';

import {
  IndexTypes,
  RegionSelectTypes,
  queryFilterRegions,
  queryPreferred,
  queryHoneymooners,
  queryAvailable,
  queryFilterStarRatings,
  searchByQueries,
  filterByRange,
} from './search';

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

  describe('queries', () => {
    describe('queryFilterStarRatings', () => {
      it('returns built or string', () => {
        expect(queryFilterStarRatings({ Foo: true, Bar: false, Boo: true })).toMatchSnapshot();
        expect(queryFilterStarRatings({ Foo: false, Bar: true, Boo: false })).toMatchSnapshot();
      });
    });

    describe('queryFilterRegions', () => {
      it('returns undefined if all', () => {
        expect(queryFilterRegions({})).toBeUndefined();
        expect(queryFilterRegions({ type: RegionSelectTypes.ALL })).toBeUndefined();
      });

      it('returns built or string', () => {
        const regions = ['Foo', 'Bar', 'Boo'];

        expect(
          queryFilterRegions(
            { type: RegionSelectTypes.SPECIFY, selected: { Foo: true, Bar: false, Boo: true } },
            regions
          )
        ).toMatchSnapshot();
        expect(
          queryFilterRegions(
            { type: RegionSelectTypes.SPECIFY, selected: { Foo: false, Bar: true, Boo: false } },
            regions
          )
        ).toMatchSnapshot();
      });
    });

    describe('queryPreferred', () => {
      it('returns preferred query string', () => {
        expect(queryPreferred()).toMatchSnapshot();
      });
    });

    describe('queryHoneymooners', () => {
      it('returns preferred query string', () => {
        expect(queryHoneymooners({ honeymooners: false })).toMatchSnapshot();
        expect(queryHoneymooners({ honeymooners: true })).toMatchSnapshot();
      });
    });

    describe('queryAvailable', () => {
      it('returns preferred query string', () => {
        expect(queryAvailable()).toMatchSnapshot();
      });
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

  describe('filterByRange', () => {
    it('removes results correctly', () => {
      const dataSet = {
        foo: {
          price: 100,
        },
        bar: {
          price: 1000,
        },
      };
      const selector = prop(__, dataSet);
      const results = [{ ref: 'foo' }, { ref: 'bar' }];

      expect(filterByRange(selector, [0, 50], 'price', results)).toMatchSnapshot();
      expect(filterByRange(selector, [50, 200], 'price', results)).toMatchSnapshot();
      expect(filterByRange(selector, [50, 2000], 'price', results)).toMatchSnapshot();
      expect(filterByRange(selector, [200, 2000], 'price', results)).toMatchSnapshot();
      expect(filterByRange(selector, [2500, 3000], 'price', results)).toMatchSnapshot();
    });
  });
});
