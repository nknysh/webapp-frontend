import { noop, isArray, isFunction, mapWithIndex } from './helpers';

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
});
