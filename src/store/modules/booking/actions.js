import { mergeDeepRight, mapObjIndexed, prop, path, pathOr, values, map} from 'ramda';
import { normalize } from 'normalizr';
import { format, isEqual } from 'date-fns';

import client from 'api/hotels';

import uiConfig from 'config/ui';

import { successAction } from 'store/common';
import { FETCH_HOTELS } from 'store/modules/hotels/actions';
import {default as hotelSchema} from 'store/modules/hotel/schema'

import { getBookingData, getBookingRoomDatesById } from './selectors';

export const BOOKING_UPDATE = 'BOOKING_UPDATE';

export const updateBookingAction = payload => ({
  type: BOOKING_UPDATE,
  payload,
});

export const updateBooking = (id, payload) => async (dispatch, getState) => {
  const state = getState();

  const dispatchComplete = (completedPayload) => {
    dispatch(updateBookingAction(completedPayload));
    dispatch(successAction(BOOKING_UPDATE, mergeDeepRight(getBookingData(state), { [id]: completedPayload })));
  }

  const getSearchByRoomDates = (roomData, roomId) => {
    const {to: prevTo, from: prevFrom} = getBookingRoomDatesById(state, id, roomId);
    const { to = new Date(), from = new Date() } = pathOr({}, ['rooms', roomId, 'dates'], payload);
    
    return (!isEqual(to, prevTo) || !isEqual(from, prevFrom)) && client.getHotelRooms(id, {
      startDate: format(from, path(['dates', 'defaultFormat'], uiConfig)),
      endDate: format(to, path(['dates', 'defaultFormat'], uiConfig)),
    })
  }

  const roomChecks = mapObjIndexed(getSearchByRoomDates, prop('rooms', payload))

  const onSuccess = ({data: {data}}) => {
      const normalized = normalize(data, prop('schema', hotelSchema));

      const mapRateToRoom = (values, roomId) => {
        const bestRate = path(['entities', 'rooms', roomId, 'bestRate'], normalized);
        return bestRate ? { ...values, bestRate } : { ...values };
      }

    const roomsWithRates = mapObjIndexed(mapRateToRoom, prop('rooms', payload))
    const updatedPayload = mergeDeepRight(payload, { rooms: roomsWithRates });

    dispatchComplete(updatedPayload);
    dispatch(successAction(FETCH_HOTELS, mergeDeepRight(getBookingData(state), { [id]: updatedPayload })));
  }

  Promise
    .all(values(roomChecks))
    .then(map(onSuccess));
};
