import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import {
  SALES_REPRESENTATIVES_REQUEST,
  SALES_REPRESENTATIVES_OK,
  SALES_REPRESENTATIVES_ERROR,
  SALES_REPRESENTATIVES_RESET,
} from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const salesRepresentativesRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const salesRepresentativesOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const salesRepresentativesError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const salesRepresentativesReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [SALES_REPRESENTATIVES_REQUEST]: salesRepresentativesRequest,
    [SALES_REPRESENTATIVES_OK]: salesRepresentativesOk,
    [SALES_REPRESENTATIVES_ERROR]: salesRepresentativesError,
    [SALES_REPRESENTATIVES_RESET]: salesRepresentativesReset,
  },
  initialState
);
