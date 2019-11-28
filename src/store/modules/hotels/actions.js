import { prop, values, mergeDeepRight, pathOr, propOr, forEach } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import client from 'api/hotels';
import { createCancelToken, wasCancelled } from 'api/helpers';

import { successAction, errorFromResponse } from 'store/common';
import { index } from 'store/modules/indexes/actions';
import { getUserCountryContext } from 'store/modules/auth/selectors';
import { populateBookingBulk } from 'store/modules/bookings/actions';

import { getHotelsEntities } from './selectors';
import schema from './schema';

let ratesCanceltoken = undefined;

export const HOTELS = 'HOTELS';
export const HOTEL = 'HOTEL';

/**
 * Fetch hotels action
 *
 * @returns {object}
 */
export const fetchHotelsAction = () => ({
  type: HOTELS,
});

/**
 * Set hotels
 *
 * Sets hotels into state from difference sources. Triggers
 * a lunr reindex when there are new hotels.
 *
 * @param {object} data
 * @returns {Function}
 */
export const setHotels = data => (dispatch, getState) => {
  const prevData = getHotelsEntities(getState());
  const hotels = mergeDeepRight(prevData, pathOr({}, ['entities', 'hotels'], data));

  // Re-index all the hotels
  dispatch(
    index({
      index: 'hotels',
      ref: prop('id', schema),
      fields: prop('index', schema),
      data: values(hotels),
    })
  );

  // Run through the hotels, and if there are booking builder objects
  // then trigger a BOOKING_POPULATE_BULK action to pre-populate the booking
  // for the hotels
  const bookingData = {};
  forEach(({ bookingBuilder, name, uuid }) => {
    if (!bookingBuilder) return;
    const { request: requestedBuild, response } = bookingBuilder;
    bookingData[uuid] = { hotelUuid: uuid, hotelName: name, breakdown: { requestedBuild, ...response } };
  }, values(hotels));

  dispatch(successAction(HOTELS, data));
};

/**
 * Fetch hotels
 *
 * @param {*} params
 * @returns {Function}
 */
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

/**
 * Fetch hotel room rates by dates
 *
 * Fetchs the given hotels room rates based on the dates supplied. Used by the rate
 * drop down calendar when editing rooms
 *
 * @param {string} hotelId
 * @param {string} productUuid
 * @param {string | Date} startDate
 * @param {string | Date} endDate
 */
export const fetchHotelRoomRatesByDates = (hotelId, productUuid, startDate, endDate) => async (dispatch, getState) => {
  const actingCountryCode = getUserCountryContext(getState());

  // Build aa cancel token so that requests can be cancelled when user
  // navigates to anotther month
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
              // Add rates to the products they are assigned to
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
