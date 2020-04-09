import { prop, pipe, reduce, values, sortBy, mergeDeepRight } from 'ramda';

import { getStatus, getData, getResults, getEntities, getArg } from 'store/common';
import { createSelector } from 'store/utils';

/**
 * Get countries selector
 *
 * @param {object}
 * @returns {object}
 */
export const getCountries = prop('countries');

/**
 * Get countries status selector
 *
 * @param {object}
 * @returns {string}
 */
export const getCountriesStatus = createSelector(getCountries, getStatus);

/**
 * Get countries data selector
 *
 * @param {object}
 * @returns {*}
 */
export const getCountriesData = createSelector(getCountries, getData);

/**
 * Get countries entities selector
 *
 * @param {object}
 * @returns {object}
 */
export const getCountriesEntities = createSelector(getCountries, pipe(getEntities, prop('countries')));

/**
 * Get countries results selector
 *
 * @param {object}
 * @returns {Array | string}
 */
export const getCountriesResults = createSelector(getCountries, getResults);

/**
 * Get country selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getCountry = createSelector([getArg(1), getCountriesEntities], prop);

/**
 * Get country name selector
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getCountryName = createSelector(getCountry, prop('name'));

/**
 * Get countries names as key value selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getCountriesNamesAsKeyValue = createSelector(
  getCountriesEntities,
  pipe(
    values,
    sortBy(prop('name')),
    reduce((accum, { code, name }) => mergeDeepRight(accum, { [code]: name }), {})
  )
);

/**
 * Get countries codes as key value selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getCountriesCodesAsKeyValue = createSelector(
  getCountriesEntities,
  pipe(
    values,
    sortBy(prop('code')),
    reduce((accum, { code }) => mergeDeepRight(accum, { [code]: code }), {})
  )
);
