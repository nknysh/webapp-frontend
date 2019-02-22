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

import RatesApi from '../api/rates';

import { fetchHotels } from './hotels';
import { fetchBookings } from './bookings';
import { fetchProposals } from './proposals';

import { fetchNestedData } from './utils';

import { getAuthToken } from '../selectors';

const actionCreatorMap = {
  hotel: fetchHotels,
  booking: fetchBookings,
  proposal: fetchProposals,
};

/* eslint-disable no-unused-vars */
export const RATES_REQUEST = 'RATES_REQUEST';
export const RATES_OK = 'RATES_OK';
export const RATES_ERROR = 'RATES_ERROR';
export const RATES_RESET = 'RATES_RESET';

const ratesRequest = value => ({
  type: RATES_REQUEST,
  payload: value,
});

const ratesOk = value => ({
  type: RATES_OK,
  payload: value,
});

const ratesError = value => ({
  type: RATES_ERROR,
  payload: value,
});

const ratesReset = value => ({
  type: RATES_RESET,
  payload: value,
});
/* eslint-enable */

const fetchRates = (args = {}) => (dispatch, getState) => {
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
   *  - hotel [hotel]
   *  - booking [booking]
   *  - proposal [proposal]
   */

  dispatch(ratesRequest(args));

  return RatesApi.fetchRates(args)
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

      requests.push(dispatch(ratesOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(ratesError(out));
    });
};

const fetchRate = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchRates(args));
};

const createRate = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(ratesRequest(args));

  return RatesApi.createRate(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(ratesOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(ratesError(out));
      return error;
    });
};

const updateRate = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(ratesRequest(args));

  return RatesApi.updateRate(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(ratesOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(ratesError(out));
      return error;
    });
};

const deleteRate = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(ratesRequest(args));

  return RatesApi.deleteRate(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(ratesOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(ratesError(out));
      return error;
    });
};

const resetRates = (args = {}) => dispatch => Promise.resolve(dispatch(ratesReset(args)));

const fetchRatesForRoom = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(ratesRequest(args));

  return RatesApi.fetchRatesForRoom(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(ratesOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(ratesError(out));
      return error;
    });
};

export { fetchRates, fetchRatesForRoom, fetchRate, createRate, updateRate, deleteRate, resetRates };
