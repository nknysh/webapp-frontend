import { __, prop, pipe, curry, values, propEq, find } from 'ramda';

export const getCountries = prop('countries');

export const getCountriesStatus = pipe(
  getCountries,
  prop('status')
);

export const getCountriesData = pipe(
  getCountries,
  prop('data')
);

export const getCountry = curry((state, key) =>
  pipe(
    getCountriesData,
    prop(key)
  )(state)
);

export const getCountryName = curry((state, key) =>
  pipe(
    getCountry(__, key),
    prop('name')
  )(state)
);

export const getCountryIdByName = curry((state, name) =>
  pipe(
    getCountriesData,
    values,
    find(propEq('name', name)),
    prop('code')
  )(state)
);
