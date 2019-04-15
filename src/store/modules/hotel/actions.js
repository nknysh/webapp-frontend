import { propOr, pathOr } from 'ramda';

import { formatDate } from 'utils';

import client from 'api/hotels';

import { successAction, errorAction } from 'store/common';
import { fetchHotelsSuccess } from 'store/modules/hotels/actions';
import { getSearchQuery } from 'store/modules/search/selectors';

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

  const onSuccess = ({ data: { data } }) => {
    dispatch(successAction(FETCH_HOTEL, data));
    dispatch(fetchHotelsSuccess(data));
  };

  return client
    .getHotel(id, {
      associations: 'photos,accommodationProducts',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    })
    .then(onSuccess)
    .catch(error => dispatch(errorAction(FETCH_HOTEL, propOr(error, 'response', error))));
};
