import UsersApi from 'api/users';

import { fetchCompanies } from 'store/modules/companies/actions';
import { fetchBookings } from 'store/modules/bookings/actions';
import { fetchOffers } from 'store/modules/offers/actions';

import fetchNestedData from 'store/utils/fetchNestedData';

import { getAuthToken } from 'store/modules/auth/selectors';

const actionCreatorMap = {
  company: fetchCompanies,
  salesRepresentativeAssigned: fetchUsers, // eslint-disable-line no-use-before-define
  bookings: fetchBookings,
  offers: fetchOffers,
};

/* eslint-disable no-unused-vars */
export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_OK = 'USERS_OK';
export const USERS_ERROR = 'USERS_ERROR';
export const USERS_RESET = 'USERS_RESET';

const usersRequest = value => ({
  type: USERS_REQUEST,
  payload: value,
});

const usersOk = value => ({
  type: USERS_OK,
  payload: value,
});

const usersError = value => ({
  type: USERS_ERROR,
  payload: value,
});

const usersReset = value => ({
  type: USERS_RESET,
  payload: value,
});
/* eslint-enable */

const fetchUsers = (args = {}) => (dispatch, getState) => {
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
   *  - salesRepresentativeAssigned [user]
   *  - bookings [booking]
   *  - offers [offer]
   */

  dispatch(usersRequest(args));

  return UsersApi.fetchUsers(args)
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

      requests.push(dispatch(usersOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(usersError(out));
    });
};

const fetchUser = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchUsers(args));
};

const createUser = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(usersRequest(args));

  return UsersApi.createUser(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(usersOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(usersError(out));
    });
};

const updateUser = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(usersRequest(args));

  return UsersApi.updateUser(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(usersOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(usersError(out));
    });
};

const deleteUser = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(usersRequest(args));

  return UsersApi.deleteUser(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(usersOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(usersError(out));
    });
};

const resetUsers = (args = {}) => dispatch => Promise.resolve(dispatch(usersReset(args)));

const inviteUser = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;
  return UsersApi.inviteUser(args);
};

const exportUsers = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;
  return UsersApi.exportUsers(args);
};

export { fetchUsers, fetchUser, createUser, updateUser, deleteUser, resetUsers, inviteUser, exportUsers };
