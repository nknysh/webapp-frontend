import { propOr, path, prop, map, pathOr } from 'ramda';
import { normalize } from 'normalizr';
import { format } from 'date-fns';

import uiConfig from 'config/ui';

import client from 'api/hotels';

import { successAction, errorAction, setNormalizedData } from 'store/common';
import { fetchHotelsSuccess } from 'store/modules/hotels/actions';
import { getSearchQuery } from 'store/modules/search/selectors';

import schema from './schema';

export const FETCH_HOTEL = 'FETCH_HOTEL';
export const FETCH_HOTEL_ROOMS = 'FETCH_HOTEL_ROOMS';

export const fetchHotelAction = () => ({
  type: FETCH_HOTEL,
});

export const fetchHotelRoomsAction = payload => ({
  type: FETCH_HOTEL_ROOMS,
  payload,
});

export const fetchHotel = id => (dispatch, getState) => {
  const state = getState();
  const searchQuery = getSearchQuery(state);

  const startDate = pathOr(Date.now(), ['dates', 'from'], searchQuery);
  const endDate = pathOr(Date.now(), ['dates', 'to'], searchQuery);

  dispatch(fetchHotelAction());

  const requests = [
    client.getHotel(id, { associations: 'photos' }),
    client.getHotelRooms(id, {
      startDate: format(startDate, path(['dates', 'defaultFormat'], uiConfig)),
      endDate: format(endDate, path(['dates', 'defaultFormat'], uiConfig)),
    }),
  ];

  const onSuccess = ({ data: { data } }) => {
    dispatch(successAction(FETCH_HOTEL, data));
    const normalized = normalize(data, prop('schema', schema));

    setNormalizedData(dispatch, propOr({}, 'relationships', schema), normalized);

    const withRooms = {
      ...path(['entities', 'hotel', id], normalized),
      rooms: path(['entities', 'rooms'], normalized),
    };

    dispatch(fetchHotelsSuccess({ [id]: withRooms }));
  };

  return Promise.all(requests)
    .then(map(onSuccess))
    .catch(error => dispatch(errorAction(FETCH_HOTEL, propOr(error, 'response', error))));
};
