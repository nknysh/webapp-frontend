import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { COMPANIES_REQUEST, COMPANIES_OK, COMPANIES_ERROR, COMPANIES_RESET } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const companiesRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const companiesOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const companiesError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const companiesReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [COMPANIES_REQUEST]: companiesRequest,
    [COMPANIES_OK]: companiesOk,
    [COMPANIES_ERROR]: companiesError,
    [COMPANIES_RESET]: companiesReset,
  },
  initialState
);
