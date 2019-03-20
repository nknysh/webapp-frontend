import { values, equals, prop, length } from 'ramda';

import { index } from 'store/modules/indexes/actions';
import { successAction } from 'store/common/actions';

import schema from './schema';
import { getCountriesData } from './selectors';

export const SET_COUNTRIES = 'SET_COUNTRIES';

export const setCountriesAction = payload => ({
  type: SET_COUNTRIES,
  payload,
});

export const setCountries = payload => (dispatch, getState) => {
  const before = values(getCountriesData(getState()));

  dispatch(successAction(SET_COUNTRIES, payload));

  const after = values(getCountriesData(getState()));

  if (equals(length(before), length(after))) return;

  dispatch(
    index({
      index: 'countries',
      ref: prop('id', schema),
      fields: prop('index', schema),
      data: after,
    })
  );
};
