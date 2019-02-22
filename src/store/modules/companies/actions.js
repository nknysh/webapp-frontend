import CompaniesApi from 'api/companies';

import { fetchUsers } from 'store/modules/users/actions';
import { getAuthToken } from 'store/modules/auth/selectors';

import fetchNestedData from 'store/utils/fetchNestedData';

const actionCreatorMap = {
  travelAgent: fetchUsers,
};

/* eslint-disable no-unused-vars */
export const COMPANIES_REQUEST = 'COMPANIES_REQUEST';
export const COMPANIES_OK = 'COMPANIES_OK';
export const COMPANIES_ERROR = 'COMPANIES_ERROR';
export const COMPANIES_RESET = 'COMPANIES_RESET';

const companiesRequest = value => ({
  type: COMPANIES_REQUEST,
  payload: value,
});

const companiesOk = value => ({
  type: COMPANIES_OK,
  payload: value,
});

const companiesError = value => ({
  type: COMPANIES_ERROR,
  payload: value,
});

const companiesReset = value => ({
  type: COMPANIES_RESET,
  payload: value,
});
/* eslint-enable */

const fetchCompanies = (args = {}) => (dispatch, getState) => {
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
   */

  dispatch(companiesRequest(args));

  return CompaniesApi.fetchCompanies(args)
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

      requests.push(dispatch(companiesOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(companiesError(out));
    });
};

const fetchCompany = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchCompanies(args));
};

const createCompany = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(companiesRequest(args));

  return CompaniesApi.createCompany(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(companiesOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(companiesError(out));
    });
};

const updateCompany = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(companiesRequest(args));

  return CompaniesApi.updateCompany(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(companiesOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(companiesError(out));
    });
};

const deleteCompany = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(companiesRequest(args));

  return CompaniesApi.deleteCompany(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(companiesOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(companiesError(out));
    });
};

const resetCompanies = (args = {}) => dispatch => Promise.resolve(dispatch(companiesReset(args)));

const uploadLogo = ({ file, id }) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);
  return CompaniesApi.uploadLogo({ token, id, file });
};

export { fetchCompanies, fetchCompany, createCompany, updateCompany, deleteCompany, resetCompanies, uploadLogo };
