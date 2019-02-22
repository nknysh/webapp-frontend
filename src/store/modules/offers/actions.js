import OffersApi from 'api/offers';

import { fetchBookings } from 'store/modules/bookings/actions';
import { fetchProposals } from 'store/modules/proposals/actions';

import fetchNestedData from 'store/utils/fetchNestedData';

import { getAuthToken } from 'store/modules/auth/selectors';

const actionCreatorMap = {
  booking: fetchBookings,
  proposal: fetchProposals,
};

/* eslint-disable no-unused-vars */
export const OFFERS_REQUEST = 'OFFERS_REQUEST';
export const OFFERS_OK = 'OFFERS_OK';
export const OFFERS_ERROR = 'OFFERS_ERROR';
export const OFFERS_RESET = 'OFFERS_RESET';

const offersRequest = value => ({
  type: OFFERS_REQUEST,
  payload: value,
});

const offersOk = value => ({
  type: OFFERS_OK,
  payload: value,
});

const offersError = value => ({
  type: OFFERS_ERROR,
  payload: value,
});

const offersReset = value => ({
  type: OFFERS_RESET,
  payload: value,
});
/* eslint-enable */

const fetchOffers = (args = {}) => (dispatch, getState) => {
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
   *  - booking [booking]
   *  - proposal [proposal]
   */

  dispatch(offersRequest(args));

  return OffersApi.fetchOffers(args)
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

      requests.push(dispatch(offersOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(offersError(out));
    });
};

const fetchOffer = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchOffers(args));
};

const createOffer = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(offersRequest(args));

  return OffersApi.createOffer(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(offersOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(offersError(out));
    });
};

const updateOffer = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(offersRequest(args));

  return OffersApi.updateOffer(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(offersOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(offersError(out));
    });
};

const deleteOffer = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(offersRequest(args));

  return OffersApi.deleteOffer(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(offersOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(offersError(out));
    });
};

const resetOffers = (args = {}) => dispatch => Promise.resolve(dispatch(offersReset(args)));

export { fetchOffers, fetchOffer, createOffer, updateOffer, deleteOffer, resetOffers };
