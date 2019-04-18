import { initialState } from 'store/common';

import { getCountries, getCountriesData } from './selectors';

const state = {
  countries: {
    ...initialState,
    data: {
      foo: {
        id: 'bar',
        name: 'FooBar',
      },
    },
  },
};

describe('countries selectors', () => {
  describe('getCountries', () => {
    it('returns the root key', () => {
      expect(getCountries(state)).toBe(state.countries);
    });
  });
  describe('getCountriesData', () => {
    it('returns the data key', () => {
      expect(getCountriesData(state)).toBe(state.countries.data);
    });
  });
});
