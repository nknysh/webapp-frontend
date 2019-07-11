import { pathOr } from 'ramda';

import { formatDate } from 'utils';

import client from 'api/hotels';

import { successAction, errorFromResponse } from 'store/common';
import { setHotels } from 'store/modules/hotels';
import { getSearchQuery } from 'store/modules/search';
import { getUserCountryContext } from 'store/modules/auth';

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
  const actingCountryCode = getUserCountryContext(state);
  const searchQuery = getSearchQuery(state);

  const startDate = pathOr(Date.now(), ['dates', 'startDate'], searchQuery);
  const endDate = pathOr(Date.now(), ['dates', 'endDate'], searchQuery);

  dispatch(fetchHotelAction());

  try {
    const {
      data: { data },
    } = await client.getHotel(id, {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      actingCountryCode,
    });

    dispatch(successAction(HOTEL, data));
    dispatch(setHotels(data));
  } catch (e) {
    dispatch(errorFromResponse(HOTEL, e, 'There was a problem fetching this hotel. Please try again.'));
  }
};
