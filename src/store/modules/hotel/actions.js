import { propOr } from 'ramda';

import client from 'api/hotels';

import { successAction, errorAction } from 'store/common/actions';
import { FETCH_HOTELS } from 'store/modules/hotels/actions';
import { getHotel } from 'store/modules/hotels/selectors';

export const FETCH_HOTEL = 'FETCH_HOTEL';

export const fetchHotelAction = () => ({
  type: FETCH_HOTEL,
});

export const fetchHotel = id => (dispatch, getState) => {
  dispatch(fetchHotelAction());

  const hotel = getHotel(getState(), id);

  if (hotel) return successAction(FETCH_HOTEL, hotel);

  return client
    .getHotel(id)
    .then(({ data: { data } }) => {
      dispatch(successAction(FETCH_HOTEL, data));
      dispatch(successAction(FETCH_HOTELS, [data]));
    })
    .catch(error => dispatch(errorAction(FETCH_HOTEL, propOr(error, 'response', error))));
};
