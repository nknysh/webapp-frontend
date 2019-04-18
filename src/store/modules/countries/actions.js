import { ap, values, path, prop, mergeDeepRight } from 'ramda';

import { index } from 'store/modules/indexes/actions';
import { successAction } from 'store/common/actions';

import schema from './schema';
import { getCountriesEntities } from './selectors';

export const SET_COUNTRIES = 'SET_COUNTRIES';

export const setCountriesAction = payload => ({
  type: SET_COUNTRIES,
  payload,
});

export const setCountries = data => (dispatch, getState) => {
  const prevData = getCountriesEntities(getState());
  const countries = mergeDeepRight(prevData, path(['entities', 'countries'], data));

  ap(
    [dispatch],
    [
      successAction(SET_COUNTRIES, data),
      index({
        index: 'countries',
        ref: prop('id', schema),
        fields: prop('index', schema),
        data: values(countries),
      }),
    ]
  );
};
