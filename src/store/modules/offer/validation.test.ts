import { Validator, isPercentageCompliant } from './validation';

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

describe('validation funcs', () => {
  describe('isPercentage', () => {
    it('allows a number between 1 and 100', () => {
      const testVal = 40;

      expect(isPercentageCompliant(testVal)).toEqual(true);
    });

    it('allows a number between 1 and 100 with decimal places', () => {
      const testVal = 40.54;

      expect(isPercentageCompliant(testVal)).toEqual(true);
    });

    it('doesnt allow a number between 1 and 100 with 3 or more decimal places', () => {
      const testVal = 40.542;

      expect(isPercentageCompliant(testVal)).toEqual(false);
    });

    it('allows a string int between 1 and 100', () => {
      const testVal = '20';

      expect(isPercentageCompliant(testVal)).toEqual(true);
    });

    it('allows a string float to 2 decimal places between 1 and 100', () => {
      const testVal = '20.98';

      expect(isPercentageCompliant(testVal)).toEqual(true);
    });

    it('doesnt allow a base string value', () => {
      const testVal = 'hello';

      expect(isPercentageCompliant(testVal)).toEqual(false);
    });

    it('doesnt allow a string number with a prefix', () => {
      const testVal = '$20';

      expect(isPercentageCompliant(testVal)).toEqual(false);
    });

    it('doesnt allow a string number with a suffix', () => {
      const testVal = '20.99%';

      expect(isPercentageCompliant(testVal)).toEqual(false);
    });

    it('doesnt allow a string number with more than 2 decimal places', () => {
      const testVal = '25.465';

      expect(isPercentageCompliant(testVal)).toEqual(false);
    });
  });
});
