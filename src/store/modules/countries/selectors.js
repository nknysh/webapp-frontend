import { prop, pipe, reduce, values, sortBy, mergeDeepRight } from 'ramda';

import { getStatus, getData, getResults, getEntities, getArg } from 'store/common/selectors';
import { createSelector } from 'store/utils';

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

export const getCountry = createSelector(
  [getArg(1), getCountriesEntities],
  prop
);

export const getCountryName = createSelector(
  getCountry,
  prop('name')
);

export const getCountriesNamesAsKeyValue = createSelector(
  getCountriesEntities,
  pipe(
    values,
    sortBy(prop('name')),
    reduce((accum, { code, name }) => mergeDeepRight(accum, { [code]: name }), {})
  )
);

export const getCountriesCodesAsKeyValue = createSelector(
  getCountriesEntities,
  pipe(
    values,
    sortBy(prop('code')),
    reduce((accum, { code }) => mergeDeepRight(accum, { [code]: code }), {})
  )
);
