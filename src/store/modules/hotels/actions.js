import HotelsApi from 'api/hotels';

import { fetchRooms } from 'store/modules/rooms/actions';
import { fetchBookings } from 'store/modules/bookings/actions';
import fetchNestedData from 'store/utils/fetchNestedData';

import { getAuthToken } from 'store/modules/auth/selectors';

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
