import { Validator } from './validation';

describe('validation', () => {
  describe('required()', () => {
    it('is required checks for existence of a value on the object (passing)', () => {
      const modelInstance = {
        a: 'A',
      };
      const results = new Validator<{ a: string }>(modelInstance).required('a').results();
      expect(results.errors.length).toEqual(0);
    });

    it('is required checks for existence of a value on the object (failing)', () => {
      const modelInstance = {
        a: undefined,
      };
      const results = new Validator<{ a: string }>(modelInstance).required('a').results();
      expect(results.errors.length).toEqual(1);
    });
  });

  describe('min()', () => {
    it('ensures arrays are of the minimum length (passing)', () => {
      const modelInstance = {
        a: [1, 3, 5, 7],
      };

      const results = new Validator<{ a: number[] }>(modelInstance).min('a', 4).results();
      expect(results.errors.length).toEqual(0);
    });

    it('ensures arrays are of the minimum length (failing)', () => {
      const modelInstance = {
        a: [1, 3],
      };

      const results = new Validator<{ a: number[] }>(modelInstance).min('a', 4).results();
      expect(results.errors.length).toEqual(1);
    });

    it('ensures strings are of the minimum length (passing)', () => {
      const modelInstance = {
        name: 'Abcde',
      };

      const results = new Validator<{ name: string }>(modelInstance).min('name', 4).results();
      expect(results.errors.length).toEqual(0);
    });

    it('ensures strings are of the minimum length (failing)', () => {
      const modelInstance = {
        name: 'Ab',
      };

      const results = new Validator<{ name: string }>(modelInstance).min('name', 4).results();

      expect(results.errors.length).toEqual(1);
    });
  });

  describe('number()', () => {
    it('ensure number has to be numeric (passing)', () => {
      const modelInstance = {
        age: 10,
      };
      const results = new Validator<{ age: any }>(modelInstance).number('age').results();
      expect(results.errors.length).toEqual(0);
    });

    it('ensure number has to be numeric (failing with random string)', () => {
      const modelInstance = {
        age: 'string value',
      };
      const results = new Validator<{ age: any }>(modelInstance).number('age').results();
      expect(results.errors.length).toEqual(1);
    });

    it('ensure number has to be numeric (failing with string number)', () => {
      const modelInstance = {
        age: '10',
      };
      const results = new Validator<{ age: any }>(modelInstance).number('age').results();
      expect(results.errors.length).toEqual(1);
    });
  });
});
