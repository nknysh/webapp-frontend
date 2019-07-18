import { prop, values, mergeDeepRight, pathOr, propOr, forEach } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import client from 'api/hotels';
import { createCancelToken, wasCancelled } from 'api/helpers';

import { successAction, errorFromResponse } from 'store/common';
import { index } from 'store/modules/indexes/actions';
import { getUserCountryContext } from 'store/modules/auth/selectors';
import { populateBooking } from 'store/modules/bookings/actions';

import { getHotelsEntities } from './selectors';
import schema from './schema';

let ratesCanceltoken = undefined;

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

  forEach(({ bookingBuilder, name, uuid }) => {
    if (!bookingBuilder) return;

    const { request: requestedBuild, response } = bookingBuilder;

    dispatch(populateBooking(uuid, { hotelUuid: uuid, hotelName: name, breakdown: { requestedBuild, ...response } }));
  }, values(hotels));

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
    dispatch(errorFromResponse(HOTELS, e, 'There was a problem getting hotels.'));
  }
};

export const fetchHotelRoomRatesByDates = (hotelId, productUuid, startDate, endDate) => async (dispatch, getState) => {
  const actingCountryCode = getUserCountryContext(getState());

  ratesCanceltoken && ratesCanceltoken.cancel('New rates requested');
  ratesCanceltoken = createCancelToken();

  if (isNilOrEmpty(startDate) || isNilOrEmpty(endDate)) return;

  dispatch(fetchHotelsAction());

  try {
    const {
      data: { data },
    } = await client.getHotelRoomRates(
      productUuid,
      { startDate, endDate, actingCountryCode },
      { cancelToken: ratesCanceltoken.token }
    );

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
    !wasCancelled(e) && dispatch(errorFromResponse(HOTELS, e, 'Could not fetch rates for those dates.'));
  }
};
