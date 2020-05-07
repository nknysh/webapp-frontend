import client from 'api';
import { pathOr, path } from 'ramda';
import { formatDate } from 'utils';
import { subDays } from 'date-fns';
import { getUserCountryContext } from 'store/modules/auth/selectors';

import { offersQuerySelector } from 'store/modules/fastSearch';

export const actionTypes = {
  FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS: 'FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS',
  FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS_FAIL: 'FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS_FAIL',
};

export const fetchCurrentHotelAccommodationProductDisplays = hotelUuid => async (dispatch, getState) => {
  const state = getState();

  const searchQuery = offersQuerySelector(state);

  const actingCountryCode = getUserCountryContext(state);
  // Default to todays date if there are no dates in the search query in redux
  const startDate = formatDate(pathOr(Date.now(), ['startDate'], searchQuery));

  const endDate = formatDate(pathOr(Date.now(), ['endDate'], searchQuery));

  try {
    const responses = await client.get(
      `/hotel-accommodation-products/${hotelUuid}?startDate=${startDate}&endDate=${endDate}&actingCountryCode=${actingCountryCode}`
    );

    dispatch({
      type: actionTypes.FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS,
      payload: responses.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS_FAIL,
      payload: {
        error: e.message,
      },
    });
  }
};
