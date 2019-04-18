import { prop, values, mergeDeepRight, pathOr } from 'ramda';

import client from 'api/hotels';

import { successAction, errorFromResponse } from 'store/common';
import { index } from 'store/modules/indexes/actions';

import { getHotelsEntities } from './selectors';
import schema from './schema';

export const HOTELS = 'HOTELS';
export const HOTEL = 'HOTEL';

export const fetchHotelsAction = () => ({
  type: HOTELS,
});

export const setHotels = data => (dispatch, getState) => {
  const prevData = getHotelsEntities(getState());
  const hotels = mergeDeepRight(prevData, pathOr({}, ['entities', 'hotels'], data));

  dispatch(
    index({
      index: 'hotels',
      ref: prop('id', schema),
      fields: prop('index', schema),
      data: values(hotels),
    })
  );
  dispatch(successAction(HOTELS, data));
};

export const fetchHotels = params => async dispatch => {
  dispatch(fetchHotelsAction());

  try {
    const {
      data: { data },
    } = await client.getHotels({ sort: ['hotel.name'], associations: 'featuredPhoto', ...params });

    dispatch(setHotels(data));
  } catch (e) {
    dispatch(errorFromResponse(HOTELS, e));
    throw e;
  }
};

export const fetchHotelRoomRatesByDates = (hotelId, productUuid, startDate, endDate) => async dispatch => {
  dispatch(fetchHotelsAction());

  try {
    const {
      data: { data },
    } = await client.getHotelRoomRates(productUuid, { startDate, endDate });

    dispatch(
      setHotels({
        entities: {
          accommodationProducts: {
            [productUuid]: {
              rates: { ...data },
            },
          },
        },
      })
    );
  } catch (e) {
    dispatch(errorFromResponse(HOTELS, e));
    throw e;
  }
};
