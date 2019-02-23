import RoomsApi from 'api/rooms';

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
export const ROOMS_REQUEST = 'ROOMS_REQUEST';
export const ROOMS_OK = 'ROOMS_OK';
export const ROOMS_ERROR = 'ROOMS_ERROR';
export const ROOMS_RESET = 'ROOMS_RESET';

const roomsRequest = value => ({
  type: ROOMS_REQUEST,
  payload: value,
});

const roomsOk = value => ({
  type: ROOMS_OK,
  payload: value,
});

const roomsError = value => ({
  type: ROOMS_ERROR,
  payload: value,
});

const roomsReset = value => ({
  type: ROOMS_RESET,
  payload: value,
});
/* eslint-enable */

const fetchRooms = (args = {}) => (dispatch, getState) => {
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

  dispatch(roomsRequest(args));

  return RoomsApi.fetchRooms(args)
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

      requests.push(dispatch(roomsOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(roomsError(out));
    });
};

const fetchRoom = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchRooms(args));
};

const createRoom = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(roomsRequest(args));

  return RoomsApi.createRoom(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(roomsOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(roomsError(out));
      return error;
    });
};

const updateRoom = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(roomsRequest(args));

  return RoomsApi.updateRoom(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(roomsOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(roomsError(out));
      return error;
    });
};

const deleteRoom = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(roomsRequest(args));

  return RoomsApi.deleteRoom(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(roomsOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(roomsError(out));
      return error;
    });
};

const resetRooms = (args = {}) => dispatch => Promise.resolve(dispatch(roomsReset(args)));

export { fetchRooms, fetchRoom, createRoom, updateRoom, deleteRoom, resetRooms };
