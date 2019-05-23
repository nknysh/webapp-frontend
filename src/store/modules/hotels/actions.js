import { prop, values, mergeDeepRight, pathOr, propOr } from 'ramda';

import client from 'api/hotels';

import { successAction, errorFromResponse } from 'store/common';
import { index } from 'store/modules/indexes/actions';
import { enqueueNotification } from 'store/modules/ui/actions';
import { getUserCountryContext } from 'store/modules/auth/selectors';

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

export const fetchHotels = params => async (dispatch, getState) => {
  const actingCountryCode = getUserCountryContext(getState());
  dispatch(fetchHotelsAction());

  try {
    const {
      data: { data },
    } = await client.getHotels({ sort: ['hotel.name'], associations: 'featuredPhoto', actingCountryCode, ...params });

    dispatch(setHotels(data));
  } catch (e) {
    dispatch(errorFromResponse(HOTELS, e));
    dispatch(enqueueNotification({ message: 'There was a problem getting hotels.', options: { variant: 'error' } }));
  }
};

export const fetchHotelRoomRatesByDates = (hotelId, productUuid, startDate, endDate) => async (dispatch, getState) => {
  const actingCountryCode = getUserCountryContext(getState());

  dispatch(fetchHotelsAction());

  try {
    const {
      data: { data },
    } = await client.getHotelRoomRates(productUuid, { startDate, endDate, actingCountryCode });

    dispatch(
      setHotels({
        entities: {
          ...propOr({}, 'entities', data),
          products: {
            [productUuid]: {
              rates: { ...propOr({}, 'result', data) },
            },
          },
        },
      })
    );
  } catch (e) {
    dispatch(errorFromResponse(HOTELS, e));
    dispatch(enqueueNotification({ message: 'Could not fetch rates for those dates.', options: { variant: 'error' } }));
  }
};
