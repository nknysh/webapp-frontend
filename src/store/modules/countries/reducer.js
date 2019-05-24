import { mergeDeepRight, reduce } from 'ramda';
import countries from 'config/data/countries';

import { initialState, loadingReducer, successReducer, errorReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { COUNTRIES } from './actions';

const initialCountriesState = mergeDeepRight(initialState, {
  data: {
    entities: {
      countries: reduce((accum, { code, name }) => mergeDeepRight(accum, { [code]: { code, name } }), {}, countries),
    },
  },
});

export default createReducer(
  {
    [COUNTRIES]: loadingReducer,
    [getSuccessActionName(COUNTRIES)]: successReducer,
    [getErrorActionName(COUNTRIES)]: errorReducer,
  },
  initialCountriesState
);
