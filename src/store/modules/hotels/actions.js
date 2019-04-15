import { ap, prop, values, mergeDeepRight, propOr, pathOr } from 'ramda';

import client from 'api/hotels';

import { successAction, errorAction } from 'store/common';
import { index } from 'store/modules/indexes/actions';

import { getHotelsEntities } from './selectors';
import schema from './schema';

export const FETCH_HOTELS = 'FETCH_HOTELS';
export const FETCH_HOTEL = 'FETCH_HOTEL';

export const fetchHotelsAction = () => ({
  type: FETCH_HOTELS,
});

export const fetchHotelsSuccess = data => (dispatch, getState) => {
  const prevData = getHotelsEntities(getState());
  const hotels = mergeDeepRight(prevData, pathOr({}, ['entities', 'hotels'], data));

  ap(
    [dispatch],
    [
      index({
        index: 'hotels',
        ref: prop('id', schema),
        fields: prop('index', schema),
        data: values(hotels),
      }),
      successAction(FETCH_HOTELS, data),
    ]
  );
};

export const fetchHotels = params => dispatch => {
  dispatch(fetchHotelsAction());

  return client
    .getHotels({ sort: ['hotel.name'], associations: 'featuredPhoto', ...params })
    .then(({ data: { data } }) => {
      dispatch(fetchHotelsSuccess(data));
    })
    .catch(error => dispatch(errorAction(FETCH_HOTELS, propOr(error, 'response', error))));
};

export const fetchHotelRoomRatesByDates = (hotelId, productUuid, startDate, endDate) => dispatch => {
  dispatch(fetchHotelsAction());

  return client
    .getHotelRoomRates(productUuid, { startDate, endDate })
    .then(({ data: { data } }) => {
      dispatch(
        fetchHotelsSuccess({
          entities: {
            accommodationProducts: {
              [productUuid]: {
                rates: { ...data },
              },
            },
          },
        })
      );
    })
    .catch(error => dispatch(errorAction(FETCH_HOTELS, propOr({ message: error.message }, 'response', error))));
};
