import { prop, values, propOr, path } from 'ramda';
import { normalize } from 'normalizr';

import client from 'api/hotels';

import { successAction, errorAction, setNormalizedData } from 'store/common';
import { index } from 'store/modules/indexes/actions';

import { getHotelsData } from './selectors';
import schema from './schema';

export const FETCH_HOTELS = 'FETCH_HOTELS';
export const FETCH_HOTEL = 'FETCH_HOTEL';

export const fetchHotelsAction = () => ({
  type: FETCH_HOTELS,
});

export const fetchHotelsSuccess = data => async (dispatch, getState) => {
  const prevData = values(getHotelsData(getState()));

  const hotels = [...prevData, ...values(data)];

  dispatch(
    index({
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
    .getHotels({ sort: ['hotel.name'], associations: 'featuredPhoto', ...params })
    .then(({ data: { data } }) => {
      const normalized = normalize(data, prop('schema', schema));

      setNormalizedData(dispatch, propOr({}, 'relationships', schema), normalized);

      dispatch(fetchHotelsSuccess(path(['entities', 'hotel'], normalized)));
    })
    .catch(error => dispatch(errorAction(FETCH_HOTELS, propOr(error, 'response', error))));
};
