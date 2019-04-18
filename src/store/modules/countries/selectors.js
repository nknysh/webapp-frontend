import { __, prop, pipe, curry, values, propEq, find } from 'ramda';

import { getStatus, getData, getResults, getEntities } from 'store/common/selectors';

export const getCountries = prop('countries');

export const getCountriesStatus = pipe(
  getCountries,
  getStatus
);

export const getCountriesData = pipe(
  getCountries,
  getData
);

export const getCountriesEntities = pipe(
  getCountries,
  getEntities,
  prop('countries')
);
export const getCountriesResults = pipe(
  getCountries,
  getResults
);

export const getCountry = curry((state, key) =>
  pipe(
    getCountriesEntities,
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
    getCountriesEntities,
    values,
    find(propEq('name', name)),
    prop('code')
  )(state)
);
