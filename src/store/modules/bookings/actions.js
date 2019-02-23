import BookingsApi from 'api/bookings';
import { fetchUsers } from 'store/modules/users/actions';
import { fetchHotels } from 'store/modules/hotels/actions';
import { fetchRooms } from 'store/modules/rooms/actions';
import { fetchOffers } from 'store/modules/offers/actions';
import fetchNestedData from 'store/utils/fetchNestedData';

import { getAuthToken } from 'store/modules/auth/selectors';

const actionCreatorMap = {
  travelAgent: fetchUsers,
  salesRepresentative: fetchUsers,
  hotel: fetchHotels,
  rooms: fetchRooms,
  offers: fetchOffers,
};

/* eslint-disable no-unused-vars */
export const BOOKINGS_REQUEST = 'BOOKINGS_REQUEST';
export const BOOKING_OPTIONS_OK = 'BOOKING_OPTIONS_OK';
export const BOOKINGS_OK = 'BOOKINGS_OK';
export const BOOKINGS_ERROR = 'BOOKINGS_ERROR';
export const BOOKINGS_RESET = 'BOOKINGS_RESET';

const bookingsRequest = value => ({
  type: BOOKINGS_REQUEST,
  payload: value,
});

const bookingOptionsOk = value => ({
  type: BOOKING_OPTIONS_OK,
  payload: value,
});

const bookingsOk = value => ({
  type: BOOKINGS_OK,
  payload: value,
});

const bookingsError = value => ({
  type: BOOKINGS_ERROR,
  payload: value,
});

const bookingsReset = value => ({
  type: BOOKINGS_RESET,
  payload: value,
});
/* eslint-enable */

const makeFetchBookings = makeRequest => (args = {}) => (dispatch, getState) => {
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

  dispatch(bookingsRequest(args));

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

      requests.push(dispatch(bookingsOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(bookingsError(out));
    });
};

const fetchBookings = makeFetchBookings(BookingsApi.fetchBookings);
const searchBookings = makeFetchBookings(BookingsApi.searchBookings);

const fetchBooking = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchBookings(args));
};

const createBooking = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(bookingsRequest(args));

  return BookingsApi.createBooking(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(bookingsOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(bookingsError(out));
      return error;
    });
};

const uploadBookingInvoice = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(bookingsRequest(args));

  return BookingsApi.uploadBookingInvoice(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      dispatch(bookingsOk(out));
      return response;
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      dispatch(bookingsError(out));
      return error;
    });
};

const fetchBookingOptions = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(bookingsRequest(args));

  return BookingsApi.fetchBookingOptions(args)
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

      dispatch(bookingsError(out));
      return error;
    });
};

// TODO(james): add search
const searchBookingOptions = () => {};
const resetBookingOptions = () => {};

const updateBooking = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(bookingsRequest(args));

  return BookingsApi.updateBooking(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(bookingsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(bookingsError(out));
    });
};

const deleteBooking = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(bookingsRequest(args));

  return BookingsApi.deleteBooking(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(bookingsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(bookingsError(out));
    });
};

const resetBookings = (args = {}) => dispatch => Promise.resolve(dispatch(bookingsReset(args)));

const exportBookings = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;
  return BookingsApi.exportBookings(args);
};

export {
  fetchBookings,
  fetchBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  resetBookings,
  fetchBookingOptions,
  searchBookingOptions,
  resetBookingOptions,
  uploadBookingInvoice,
  searchBookings,
  exportBookings,
};
