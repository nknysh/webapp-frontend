import { pathOr } from 'ramda';

import { formatDate } from 'utils';

import client from 'api/hotels';

import { successAction, errorFromResponse } from 'store/common';
import { setHotels } from 'store/modules/hotels/actions';
import { getSearchQuery } from 'store/modules/search/selectors';

export const HOTEL = 'HOTEL';
export const HOTEL_ROOMS = 'HOTEL_ROOMS';

export const fetchHotelAction = () => ({
  type: HOTEL,
});

export const fetchHotelRoomsAction = payload => ({
  type: HOTEL_ROOMS,
  payload,
});

export const fetchHotel = id => async (dispatch, getState) => {
  const state = getState();
  const searchQuery = getSearchQuery(state);

  const startDate = pathOr(Date.now(), ['dates', 'from'], searchQuery);
  const endDate = pathOr(Date.now(), ['dates', 'to'], searchQuery);

  dispatch(fetchHotelAction());

  try {
    const {
      data: { data },
    } = await client.getHotel(id, {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });

    dispatch(successAction(HOTEL, data));
    dispatch(setHotels(data));
  } catch (e) {
    dispatch(errorFromResponse(HOTEL, e));
    throw e;
  }
};
