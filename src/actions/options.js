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

// App
import BookingsApi from '../api/bookings';
import { fetchUsers } from './users';
import { fetchHotels } from './hotels';
import { fetchRooms } from './rooms';
import { fetchOffers } from './offers';
import { fetchNestedData } from './utils';
import { getAuthToken } from '../selectors';

const actionCreatorMap = {
  travelAgent: fetchUsers,
  salesRepresentative: fetchUsers,
  hotel: fetchHotels,
  rooms: fetchRooms,
  offers: fetchOffers,
};

/* eslint-disable no-unused-vars */
export const BOOKING_OPTION_REQUEST = 'BOOKING_OPTION_REQUEST';
export const BOOKING_OPTIONS_OK = 'BOOKING_OPTIONS_OK';
export const BOOKING_OPTION_ERROR = 'BOOKING_OPTION_ERROR';
export const BOOKING_OPTION_RESET = 'BOOKING_OPTION_RESET';

const bookingOptionRequest = value => ({
  type: BOOKING_OPTION_REQUEST,
  payload: value,
});

const bookingOptionsOk = value => ({
  type: BOOKING_OPTIONS_OK,
  payload: value,
});

const bookingOptionError = value => ({
  type: BOOKING_OPTION_ERROR,
  payload: value,
});

const bookingsReset = value => ({
  type: BOOKING_OPTION_RESET,
  payload: value,
});
/* eslint-enable */

const makeFetchBookingsOptions = makeRequest => (args = {}) => (dispatch, getState) => {
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
   *  - travelAgent [user]
   *  - salesRepresentative [user]
   *  - hotel [hotel]
   *  - rooms [room]
   *  - offers [offer]
   */

  dispatch(bookingOptionRequest(args));

  return makeRequest(args)
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

      requests.push(dispatch(bookingOptionsOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(bookingOptionError(out));
    });
};

const fetchBookingOptions = makeFetchBookingsOptions(BookingsApi.fetchBookingOptions);
const searchBookingOptions = makeFetchBookingsOptions(BookingsApi.searchBookings);

const createBookingOption = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(bookingOptionRequest(args));

  return BookingsApi.createBookingOption(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(bookingOptionsOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(bookingOptionError(out));
      return error;
    });
};

const fetchBookingOption = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(bookingOptionRequest(args));

  return BookingsApi.fetchBookingOption(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(bookingOptionsOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(bookingOptionError(out));
      return error;
    });
};

const updateBookingOption = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(bookingOptionRequest(args));

  return BookingsApi.updateBooking(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(bookingOptionsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(bookingOptionError(out));
    });
};

const deleteBookingOption = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(bookingOptionRequest(args));

  return BookingsApi.deleteBookingOption(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(bookingOptionsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(bookingOptionError(out));
    });
};

const resetBookingOptions = (args = {}) => dispatch => Promise.resolve(dispatch(bookingsReset(args)));

export {
  createBookingOption,
  updateBookingOption,
  deleteBookingOption,
  fetchBookingOptions,
  fetchBookingOption,
  searchBookingOptions,
  resetBookingOptions,
};
