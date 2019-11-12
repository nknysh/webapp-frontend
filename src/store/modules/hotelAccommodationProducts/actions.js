import client from 'api';
import { getSearchQuery } from 'store/modules/search';
import { pathOr, path } from 'ramda';
import { formatDate } from 'utils';
import { subDays } from 'date-fns';
import { getUserCountryContext } from 'store/modules/auth/selectors';

export const actionTypes = {
  FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS: 'FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS',
  FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS_FAIL: 'FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS_FAIL',
};

export const fetchCurrentHotelAccommodationProductDisplays = hotelUuid => async (dispatch, getState) => {
  const state = getState();

  const searchQuery = getSearchQuery(state);
  const actingCountryCode = getUserCountryContext(state);
  // Default to todays date if there are no dates in the search query in redux
  const startDate = formatDate(pathOr(Date.now(), ['dates', 'startDate'], searchQuery));

  let endDate = path(['dates', 'endDate'], searchQuery);
  if (!endDate) {
    endDate = Date.now();
  }
  endDate = formatDate(subDays(new Date(endDate), 1));

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
