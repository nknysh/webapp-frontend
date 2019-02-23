import TravelAgentsApi from 'api/travelAgents';

import { fetchCompanies } from 'store/modules/companies/actions';
import { fetchSalesRepresentatives } from 'store/modules/salesRepresentatives/actions';
import { fetchBookings } from 'store/modules/bookings/actions';
import { fetchOffers } from 'store/modules/offers/actions';

import fetchNestedData from 'store/utils/fetchNestedData';

import { getAuthToken } from 'store/modules/auth/selectors';

const actionCreatorMap = {
  company: fetchCompanies,
  salesRepresentativeAssigned: fetchSalesRepresentatives,
  bookings: fetchBookings,
  offers: fetchOffers,
};

/* eslint-disable no-unused-vars */
export const TRAVEL_AGENTS_REQUEST = 'TRAVEL_AGENTS_REQUEST';
export const TRAVEL_AGENTS_OK = 'TRAVEL_AGENTS_OK';
export const TRAVEL_AGENTS_ERROR = 'TRAVEL_AGENTS_ERROR';
export const TRAVEL_AGENTS_RESET = 'TRAVEL_AGENTS_RESET';

const travelAgentsRequest = value => ({
  type: TRAVEL_AGENTS_REQUEST,
  payload: value,
});

const travelAgentsOk = value => ({
  type: TRAVEL_AGENTS_OK,
  payload: value,
});

const travelAgentsError = value => ({
  type: TRAVEL_AGENTS_ERROR,
  payload: value,
});

const travelAgentsReset = value => ({
  type: TRAVEL_AGENTS_RESET,
  payload: value,
});
/* eslint-enable */

const fetchTravelAgents = (args = {}) => (dispatch, getState) => {
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
   *  - company [company]
   *  - salesRepresentativeAssigned [salesRepresentative]
   *  - bookings [booking]
   *  - offers [offer]
   */

  dispatch(travelAgentsRequest(args));

  return TravelAgentsApi.fetchTravelAgents(args)
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

      requests.push(dispatch(travelAgentsOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(travelAgentsError(out));
    });
};

const fetchTravelAgentsAssigned = (args = {}) => (dispatch, getState) => {
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
   *  - company [company]
   *  - salesRepresentativeAssigned [salesRepresentative]
   *  - bookings [booking]
   *  - offers [offer]
   */

  dispatch(travelAgentsRequest(args));

  return TravelAgentsApi.fetchTravelAgentsAssigned(args)
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

      requests.push(dispatch(travelAgentsOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(travelAgentsError(out));
    });
};

const fetchTravelAgent = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchTravelAgents(args));
};

const createTravelAgent = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(travelAgentsRequest(args));

  return TravelAgentsApi.createTravelAgent(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(travelAgentsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(travelAgentsError(out));
    });
};

const updateTravelAgent = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(travelAgentsRequest(args));

  return TravelAgentsApi.updateTravelAgent(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(travelAgentsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(travelAgentsError(out));
    });
};

const deleteTravelAgent = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(travelAgentsRequest(args));

  return TravelAgentsApi.deleteTravelAgent(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(travelAgentsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(travelAgentsError(out));
    });
};

const resetTravelAgents = (args = {}) => dispatch => Promise.resolve(dispatch(travelAgentsReset(args)));

export {
  fetchTravelAgents,
  fetchTravelAgentsAssigned,
  fetchTravelAgent,
  createTravelAgent,
  updateTravelAgent,
  deleteTravelAgent,
  resetTravelAgents,
};
