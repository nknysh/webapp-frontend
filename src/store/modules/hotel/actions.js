import { pathOr } from 'ramda';

import { formatDate } from 'utils';

import client from 'api/hotels';

import { successAction, errorFromResponse } from 'store/common';
import { setHotels } from 'store/modules/hotels';
import { getSearchQuery } from 'store/modules/search';
import { getUserCountryContext } from 'store/modules/auth';

export const HOTEL = 'HOTEL';
export const HOTEL_ROOMS = 'HOTEL_ROOMS';

/**
 * Fetch hotel action
 *
 * @returns {object}
 */
export const fetchHotelAction = () => ({
  type: HOTEL,
});

/**
 * Fetch hotel action
 *
 * @param {object}
 * @returns {object}
 */
export const fetchHotelRoomsAction = payload => ({
  type: HOTEL_ROOMS,
  payload,
});

/**
 * Fetch hotel
 *
 * @param {string} id
 */
export const fetchHotel = id => async (dispatch, getState) => {
  const state = getState();

  // If this is an SR then the acting country code is needed
  const actingCountryCode = getUserCountryContext(state);
  const searchQuery = getSearchQuery(state);

  // Default to todays date if there are no dates in the search query in redux
  const startDate = pathOr(Date.now(), ['dates', 'startDate'], searchQuery);
  const endDate = pathOr(Date.now(), ['dates', 'endDate'], searchQuery);

  dispatch(fetchHotelAction());

  try {
    const {
      data: { data },
    } = await client.getHotel(id, {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      associations: 'uploads',
      actingCountryCode,
    });

    dispatch(successAction(HOTEL, data));
    dispatch(setHotels(data));
  } catch (e) {
    dispatch(errorFromResponse(HOTEL, e, 'There was a problem fetching this hotel. Please try again.'));
  }
};

export const fetchHotelWithAccommodationProducts = id => async (dispatch, getState) => {
  const state = getState();

  // If this is an SR then the acting country code is needed
  const actingCountryCode = getUserCountryContext(state);
  const searchQuery = getSearchQuery(state);

  // Default to todays date if there are no dates in the search query in redux
  const startDate = pathOr(Date.now(), ['dates', 'startDate'], searchQuery);
  const endDate = pathOr(Date.now(), ['dates', 'endDate'], searchQuery);

  dispatch(fetchHotelAction());

  try {
    const {
      data: { data },
    } = await client.getHotel(id, {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      associations: 'accommodationProducts',
      actingCountryCode,
    });

    dispatch(successAction(HOTEL, data));
    dispatch(setHotels(data));
  } catch (e) {
    dispatch(errorFromResponse(HOTEL, e, 'There was a problem fetching this hotel. Please try again.'));
  }
};
