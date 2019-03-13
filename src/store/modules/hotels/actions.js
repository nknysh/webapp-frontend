import { prop, values, length, equals, reduce, has, pipe, uniq } from 'ramda';
import hash from 'object-hash';

// import client from 'api/hotels';

import { successAction, errorAction } from 'store/common/actions';

import { buildIndex } from 'store/modules/search/actions';
import { setCountries } from 'store/modules/countries/actions';

import data from 'config/data/hotels';

import { getHotelsData } from './selectors';
import schema from './schema';

export const FETCH_HOTELS = 'FETCH_HOTELS';

const extractCountry = (accum, value) => (has('country', value) ? [...accum, prop('country', value)] : accum);
const buildCountry = (accum, value) => (value ? [...accum, { id: hash(value), name: value }] : accum);

const extractCountries = pipe(
  reduce(extractCountry, []),
  uniq,
  reduce(buildCountry, [])
);

export const fetchHotelsAction = () => ({
  type: FETCH_HOTELS,
});

export const fetchHotelsSuccess = ({ data }) => async (dispatch, getState) => {
  const before = values(getHotelsData(getState()));

  data ? dispatch(successAction(FETCH_HOTELS, data)) : dispatch(errorAction(FETCH_HOTELS, { error: 'No data found' }));

  const after = values(getHotelsData(getState()));

  if (equals(length(before), length(after))) return;

  const setCountriesToStore = pipe(
    extractCountries,
    setCountries,
    dispatch
  );

  setCountriesToStore(after);

  dispatch(
    buildIndex({
      index: 'hotels',
      ref: prop('id', schema),
      fields: prop('index', schema),
      data: after,
    })
  );
};

export const fetchHotels = () => dispatch => {
  dispatch(fetchHotelsAction());

  // return client
  //   .fetchHotels(values)
  //   .then(({data}) => dispatch(fetchHotelsSuccess({ data })))
  //   .catch(error => dispatch(errorAction(FETCH_HOTELS, error)));

  dispatch(fetchHotelsSuccess({ data }));
};
