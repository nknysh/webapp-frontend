import { values, pathOr, prop, mergeDeepRight, propOr } from 'ramda';

import { index } from 'store/modules/indexes/actions';
import { successAction } from 'store/common/actions';
import { isEmptyOrNil } from 'utils';

import schema from './schema';
import { getCountriesEntities } from './selectors';

export const COUNTRIES = 'COUNTRIES';

export const setCountriesAction = payload => ({
  type: COUNTRIES,
  payload,
});

export const setCountries = data => (dispatch, getState) => {
  const prevData = getCountriesEntities(getState());
  const countries = mergeDeepRight(prevData, pathOr({}, ['entities', 'countries'], data));
  const result = propOr([], 'result', data);
  const entities = propOr({}, 'entities', data);

  dispatch(
    index({
      index: 'countries',
      ref: prop('id', schema),
      fields: prop('index', schema),
      data: values(countries),
    })
  );

  dispatch(successAction(COUNTRIES, { result, ...(!isEmptyOrNil(entities) && { entities }) }));
};
