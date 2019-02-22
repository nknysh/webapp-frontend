import RatesApi from 'api/rates';

import { fetchHotels } from 'store/modules/hotels/actions';
import { fetchBookings } from 'store/modules/bookings/actions';
import { fetchProposals } from 'store/modules/proposals/actions';

import fetchNestedData from 'store/utils/fetchNestedData';

import { getAuthToken } from 'store/modules/auth/selectors';

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
