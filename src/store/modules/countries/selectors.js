import { __, prop, pipe, curry } from 'ramda';

export const getCountries = prop('countries');

export const getCountriesStatus = pipe(
  getCountries,
  prop('status')
);

export const getCountriesData = pipe(
  getCountries,
  prop('data')
);

export const getCountry = curry((state, index) =>
  pipe(
    getCountriesData,
    prop(index)
  )(state)
);

export const getCountryName = curry((state, index) =>
  pipe(
    getCountry(__, index),
    prop('name')
  )(state)
);
