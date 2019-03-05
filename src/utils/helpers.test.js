import { noop, isArray, isFunction, mapWithIndex, arrayToKeyValueObject } from './helpers';

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
});
