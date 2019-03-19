import { prop, values, reduce, has, pipe, uniq, propOr } from 'ramda';
import hash from 'object-hash';

import client from 'api/hotels';

import { successAction, errorAction } from 'store/common/actions';

import { buildIndex } from 'store/modules/search/actions';
import { setCountries } from 'store/modules/countries/actions';

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

export const fetchHotelsSuccess = ({ data: { data } }) => async (dispatch, getState) => {
  const prevData = values(getHotelsData(getState()));

  const hotels = [...prevData, ...data];

  const setCountriesToStore = pipe(
    extractCountries,
    setCountries,
    dispatch
  );

  setCountriesToStore(hotels);

  dispatch(
    buildIndex({
      index: 'hotels',
      ref: prop('id', schema),
      fields: prop('index', schema),
      data: hotels,
    })
  );

  dispatch(successAction(FETCH_HOTELS, data));
};

export const fetchHotels = params => dispatch => {
  dispatch(fetchHotelsAction());

  return client
    .getHotels({ sort: ['hotel.name'], ...params })
    .then(({ data }) => dispatch(fetchHotelsSuccess({ data })))
    .catch(error => dispatch(errorAction(FETCH_HOTELS, propOr(error, 'response', error))));
};
