import {
  noop,
  isArray,
  isFunction,
  isObject,
  mapWithIndex,
  arrayToKeyValueObject,
  buildLensesFromObject,
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
});
