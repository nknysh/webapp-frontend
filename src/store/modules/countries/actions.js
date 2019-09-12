import { values, pathOr, prop, mergeDeepRight, propOr } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import { index } from 'store/modules/indexes/actions';
import { successAction } from 'store/common/actions';

import schema from './schema';
import { getCountriesEntities } from './selectors';

export const COUNTRIES = 'COUNTRIES';

/**
 * Set countries action
 *
 * @param {object} payload
 * @return {object}
 */
export const setCountriesAction = payload => ({
  type: COUNTRIES,
  payload,
});

/**
 * Set countries
 *
 * @param {object} data
 * @returns {Function}
 */
export const setCountries = data => (dispatch, getState) => {
  // Gets previous countries
  const prevData = getCountriesEntities(getState());

  // Merges next countries into previous
  const countries = mergeDeepRight(prevData, pathOr({}, ['entities', 'countries'], data));

  // Extract the result uuids
  const result = propOr([], 'result', data);

  // Get the actual countries entities
  const entities = propOr({}, 'entities', data);

  // Index the data with lunr
  dispatch(
    index({
      index: 'countries',
      ref: prop('id', schema),
      fields: prop('index', schema),
      data: values(countries),
    })
  );

  dispatch(successAction(COUNTRIES, { result, ...(!isNilOrEmpty(entities) && { entities }) }));
};
