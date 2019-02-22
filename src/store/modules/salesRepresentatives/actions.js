import SalesRepresentativesApi from 'api/salesRepresentatives';

import { fetchBookings } from 'store/modules/bookings/actions';

import fetchNestedData from 'store/utils/fetchNestedData';

import { getAuthToken } from 'store/modules/auth/selectors';

const actionCreatorMap = {
  bookings: fetchBookings,
};

/* eslint-disable no-unused-vars */
export const SALES_REPRESENTATIVES_REQUEST = 'SALES_REPRESENTATIVES_REQUEST';
export const SALES_REPRESENTATIVES_OK = 'SALES_REPRESENTATIVES_OK';
export const SALES_REPRESENTATIVES_ERROR = 'SALES_REPRESENTATIVES_ERROR';
export const SALES_REPRESENTATIVES_RESET = 'SALES_REPRESENTATIVES_RESET';

const salesRepresentativesRequest = value => ({
  type: SALES_REPRESENTATIVES_REQUEST,
  payload: value,
});

const salesRepresentativesOk = value => ({
  type: SALES_REPRESENTATIVES_OK,
  payload: value,
});

const salesRepresentativesError = value => ({
  type: SALES_REPRESENTATIVES_ERROR,
  payload: value,
});

const salesRepresentativesReset = value => ({
  type: SALES_REPRESENTATIVES_RESET,
  payload: value,
});
/* eslint-enable */

const fetchSalesRepresentatives = (args = {}) => (dispatch, getState) => {
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
   *  - bookings [booking]
   */

  dispatch(salesRepresentativesRequest(args));

  return SalesRepresentativesApi.fetchSalesRepresentatives(args)
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

      requests.push(dispatch(salesRepresentativesOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(salesRepresentativesError(out));
    });
};

const fetchSalesRepresentative = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchSalesRepresentatives(args));
};

const createSalesRepresentative = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(salesRepresentativesRequest(args));

  return SalesRepresentativesApi.createSalesRepresentative(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(salesRepresentativesOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(salesRepresentativesError(out));
    });
};

const updateSalesRepresentative = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(salesRepresentativesRequest(args));

  return SalesRepresentativesApi.updateSalesRepresentative(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(salesRepresentativesOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(salesRepresentativesError(out));
    });
};

const deleteSalesRepresentative = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(salesRepresentativesRequest(args));

  return SalesRepresentativesApi.deleteSalesRepresentative(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(salesRepresentativesOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(salesRepresentativesError(out));
    });
};

const resetSalesRepresentatives = (args = {}) => dispatch => Promise.resolve(dispatch(salesRepresentativesReset(args)));

export {
  fetchSalesRepresentatives,
  fetchSalesRepresentative,
  createSalesRepresentative,
  updateSalesRepresentative,
  deleteSalesRepresentative,
  resetSalesRepresentatives,
};
