/**
 * Copyright © 2018 Gigster, Inc. All Rights Reserved.
 *
 * This software and/or related documentation, is protected by copyright and
 * other intellectual property laws, and Gigster and/or its licensors, as
 * applicable, own all right, title and interest in and to its content, and all
 * derivatives, translations, adaptations and combinations of the foregoing. You
 * are not permitted to copy, distribute, transmit, store, display, perform,
 * reproduce, publish, license, create derivative works from, transfer, sell, or
 * make any other use of this software and/or related documentation unless you
 * have entered into a written agreement with Gigster regarding such usage. You
 * agree that all such usage of the software and/or related documentation shall
 * be subject to the terms and conditions of such written agreement, including
 * all applicable license restrictions.
 */

import HotelsApi from '../api/hotels';

import { fetchRooms } from './rooms';
import { fetchBookings } from './bookings';

import { fetchNestedData } from './utils';

import { getAuthToken } from '../selectors';

const actionCreatorMap = {
  rooms: fetchRooms,
  booking: fetchBookings,
};

/* eslint-disable no-unused-vars */
export const HOTELS_REQUEST = 'HOTELS_REQUEST';
export const HOTELS_OK = 'HOTELS_OK';
export const HOTELS_ERROR = 'HOTELS_ERROR';
export const HOTELS_RESET = 'HOTELS_RESET';

const hotelsRequest = value => ({
  type: HOTELS_REQUEST,
  payload: value,
});

const hotelsOk = value => ({
  type: HOTELS_OK,
  payload: value,
});

const hotelsError = value => ({
  type: HOTELS_ERROR,
  payload: value,
});

const hotelsReset = value => ({
  type: HOTELS_RESET,
  payload: value,
});
/* eslint-enable */

const fetchHotels = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  if (!args.include) {
    args.include = [];
  }

  const query = args.query || {};
  delete args.query;

  const include = Object.keys(query);
  args.include = args.include.concat(include);

  /* Nested Data
   *  - rooms [room]
   *  - booking [booking]
   */

  dispatch(hotelsRequest(args));

  return HotelsApi.fetchHotels(args)
    .then(response => {
      const requests = fetchNestedData({
        list: response,
        dispatch,
        token,
        query,
        actionCreatorMap,
      });

      const out = {
        request: args,
        response,
      };

      requests.push(dispatch(hotelsOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(hotelsError(out));
    });
};

const fetchHotel = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchHotels(args));
};

const searchHotels = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  if (!args.include) {
    args.include = [];
  }

  const query = args.query || {};
  delete args.query;

  const include = Object.keys(query);
  args.include = args.include.concat(include);

  /* Nested Data
   *  - rooms [room]
   *  - booking [booking]
   */

  dispatch(hotelsRequest(args));

  return HotelsApi.searchHotels(args)
    .then(response => {
      const requests = fetchNestedData({
        list: response,
        dispatch,
        token,
        query,
        actionCreatorMap,
      });

      const out = {
        request: args,
        response,
      };

      requests.push(dispatch(hotelsOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(hotelsError(out));
    });
};

const createHotel = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(hotelsRequest(args));

  return HotelsApi.createHotel(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(hotelsOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(hotelsError(out));
      return error;
    });
};

const updateHotel = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(hotelsRequest(args));

  return HotelsApi.updateHotel(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(hotelsOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(hotelsError(out));
      return error;
    });
};

const deleteHotel = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(hotelsRequest(args));

  return HotelsApi.deleteHotel(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(hotelsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(hotelsError(out));
    });
};

const resetHotels = (args = {}) => dispatch => Promise.resolve(dispatch(hotelsReset(args)));

export { fetchHotels, fetchHotel, searchHotels, createHotel, updateHotel, deleteHotel, resetHotels };
