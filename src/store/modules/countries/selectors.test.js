import { initialState } from 'store/common';

import { getCountries, getCountriesData, getCountry, getCountryName } from './selectors';

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
  describe('getCountry', () => {
    it('returns the destination based on id', () => {
      expect(getCountry(state, 'foo')).toBe(state.countries.data.foo);
    });
  });
  describe('getCountryName', () => {
    it('returns the destination name based on id', () => {
      expect(getCountryName(state, 'foo')).toBe(state.countries.data.foo.name);
    });
  });
});
