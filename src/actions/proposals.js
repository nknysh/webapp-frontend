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

import ProposalsApi from '../api/proposals';

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
export const PROPOSALS_REQUEST = 'PROPOSALS_REQUEST';
export const PROPOSALS_OK = 'PROPOSALS_OK';
export const PROPOSALS_ERROR = 'PROPOSALS_ERROR';
export const PROPOSALS_RESET = 'PROPOSALS_RESET';

const proposalsRequest = value => ({
  type: PROPOSALS_REQUEST,
  payload: value,
});

const proposalsOk = value => ({
  type: PROPOSALS_OK,
  payload: value,
});

const proposalsError = value => ({
  type: PROPOSALS_ERROR,
  payload: value,
});

const proposalsReset = value => ({
  type: PROPOSALS_RESET,
  payload: value,
});
/* eslint-enable */

const fetchProposals = (args = {}) => (dispatch, getState) => {
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

  dispatch(proposalsRequest(args));

  return ProposalsApi.fetchProposals(args)
    .then((response) => {
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

      requests.push(dispatch(proposalsOk(out)));

      return Promise.all(requests);
    })
    .catch((error) => {
      const out = {
        request: args,
        error,
      };

      return dispatch(proposalsError(out));
    });
};

const fetchProposal = (args = {}) => (dispatch) => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchProposals(args));
};

const createProposal = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(proposalsRequest(args));

  return ProposalsApi.createProposal(args)
    .then((response) => {
      const out = {
        request: args,
        response,
      };

      return dispatch(proposalsOk(out));
    })
    .catch((error) => {
      const out = {
        request: args,
        error,
      };

      return dispatch(proposalsError(out));
    });
};

const updateProposal = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(proposalsRequest(args));

  return ProposalsApi.updateProposal(args)
    .then((response) => {
      const out = {
        request: args,
        response,
      };

      return dispatch(proposalsOk(out));
    })
    .catch((error) => {
      const out = {
        request: args,
        error,
      };

      return dispatch(proposalsError(out));
    });
};

const generateProposalPdf = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;
  return ProposalsApi.generateProposalPdf(args);
};

const deleteProposal = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(proposalsRequest(args));

  return ProposalsApi.deleteProposal(args)
    .then((response) => {
      const out = {
        request: args,
        response,
      };

      return dispatch(proposalsOk(out));
    })
    .catch((error) => {
      const out = {
        request: args,
        error,
      };

      return dispatch(proposalsError(out));
    });
};

const deleteProposalRoom = (args = {}) => (dispatch, getState) => {
  alert('Removed room from proposal');
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(proposalsRequest(args));

  return ProposalsApi.deleteProposalRoom(args)
    .then((response) => {
      const out = {
        request: args,
        response,
      };

      return dispatch(proposalsOk(out));
    })
    .catch((error) => {
      const out = {
        request: args,
        error,
      };

      return dispatch(proposalsError(out));
    });
};

const resetProposals = (args = {}) => (dispatch) =>
  Promise.resolve(dispatch(proposalsReset(args)));

export {
  fetchProposals,
  fetchProposal,
  createProposal,
  updateProposal,
  deleteProposal,
  deleteProposalRoom,
  generateProposalPdf,
  resetProposals,
};

