import {
  noop,
  isArray,
  isFunction,
  isObject,
  mapWithIndex,
  arrayToKeyValueObject,
  buildLensesFromObject,
  filterByObjectProperties,
  compareObjectsByProperties,
} from './helpers';

describe('helpers', () => {
  describe('noop', () => {
    it('returns function', () => {
      expect(noop).toBeInstanceOf(Function);
    });
  });
  describe('is helpers', () => {
    it('isFunction returns boolean', () => {
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction({})).toBeFalsy();
    });
    it('isArray returns boolean', () => {
      expect(isArray([])).toBeTruthy();
      expect(isArray({})).toBeFalsy();
    });
    it('isObject returns boolean', () => {
      expect(isObject({})).toBeTruthy();
    });
  });

  describe('mapWithIndex', () => {
    it('adds index to map function', () => {
      const mapped = (value, i) => expect(i).toBeDefined();
      mapWithIndex(mapped, ['foo']);
    });
  });

  describe('arrayToKeyValueObject', () => {
    it('returns key value from object', () => {
      expect(arrayToKeyValueObject('id', 'name')([{ id: 'foo', name: 'bar' }])).toEqual({ foo: 'bar' });
    });
  });

  describe('buildLensesFromObject', () => {
    it('returns key value from object', () => {
      expect(buildLensesFromObject({ foo: 'bar', bar: { boo: '' } })).toMatchSnapshot();
    });
  });

  describe('compareObjectsByProperties', () => {
    it('compare by 1 property', () => {
      const A = { id: 1 };
      const B = { id: 1 };

      expect(compareObjectsByProperties(A, B, ['id'])).toEqual(true);
    });

    it('compare by 1 property not matching', () => {
      const A = { id: 1 };
      const B = { id: 2 };

      expect(compareObjectsByProperties(A, B, ['id'])).toEqual(false);
    });

    it('multiple properties, but passed matches', () => {
      const A = { id: 1, foo: 10 };
      const B = { id: 1, foo: 20 };

      expect(compareObjectsByProperties(A, B, ['id'])).toEqual(true);
    });

    it('multiple properties, but passed doesnt match', () => {
      const A = { id: 1, foo: 10 };
      const B = { id: 1, foo: 20 };

      expect(compareObjectsByProperties(A, B, ['foo'])).toEqual(false);
    });

    it('match multiple properties', () => {
      const A = { id: 1, foo: 10, bar: 'A' };
      const B = { id: 1, foo: 20, bar: 'A' };

      // should be false because id matches but foo doesn't
      expect(compareObjectsByProperties(A, B, ['id', 'foo'])).toEqual(false);
    });

    it('match multiple properties different order', () => {
      const A = { id: 1, foo: 10, bar: 'A' };
      const B = { id: 2, foo: 20, bar: 'A' };

      // should be false because id doesnt match but bar does
      expect(compareObjectsByProperties(A, B, ['id', 'bar'])).toEqual(false);
    });
  });

  describe('filterByObjectProperties', () => {
    it('filter array1 by matching properties in objects on array2', () => {
      const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

      const array2 = [{ id: 1 }, { id: 3 }];

      const filtered = filterByObjectProperties(array1, array2, ['id']);

      expect(filtered.length).toEqual(2);
      expect(filtered[0].id).toEqual(1);
      expect(filtered[1].id).toEqual(3);
    });

    it('some match one property and some match another', () => {
      const array1 = [
        { id: 1, d: 'in', foo: 10 },
        { id: 1, d: 'out', foo: 11 },
        { id: 2, d: 'in', foo: 12 },
        { id: 2, d: 'out', foo: 13 },
        { id: 3, d: 'in', foo: 14 },
        { id: 3, d: 'out', foo: 15 },
      ];

      const array2 = [{ id: 2, d: 'in' }];

      const filtered = filterByObjectProperties(array1, array2, ['id', 'd']);

      expect(filtered.length).toEqual(1);
      expect(filtered[0].id).toEqual(2);
      expect(filtered[0].d).toEqual('in');
      expect(filtered[0].foo).toEqual(12);
    });
  });
});
