import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { RATES_REQUEST, RATES_OK, RATES_ERROR, RATES_RESET } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const ratesRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const ratesOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const ratesError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const ratesReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [RATES_REQUEST]: ratesRequest,
    [RATES_OK]: ratesOk,
    [RATES_ERROR]: ratesError,
    [RATES_RESET]: ratesReset,
  },
  initialState
);
