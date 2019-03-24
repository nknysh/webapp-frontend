import { propOr, path, prop } from 'ramda';
import { normalize } from 'normalizr';

import client from 'api/hotels';

import { successAction, errorAction, setNormalizedData } from 'store/common';
import { fetchHotelsSuccess } from 'store/modules/hotels/actions';

import schema from './schema';

export const FETCH_HOTEL = 'FETCH_HOTEL';

export const fetchHotelAction = () => ({
  type: FETCH_HOTEL,
});

export const fetchHotel = id => dispatch => {
  dispatch(fetchHotelAction());

  return client
    .getHotel(id, { associations: 'photos' })
    .then(({ data: { data } }) => {
      dispatch(successAction(FETCH_HOTEL, data));
      const normalized = normalize(data, prop('schema', schema));

      setNormalizedData(dispatch, propOr({}, 'relationships', schema), normalized);

      dispatch(fetchHotelsSuccess(path(['entities', 'hotel'], normalized)));
    })
    .catch(error => dispatch(errorAction(FETCH_HOTEL, propOr(error, 'response', error))));
};
