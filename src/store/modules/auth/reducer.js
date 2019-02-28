import { createReducer } from 'store/utils';

import { AUTH_REQUEST, AUTH_OK, AUTH_ERROR, AUTH_RESET, AUTH_SET_TOKEN } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {
    user: undefined,
    token: undefined,
  },
  error: undefined,
};

const authRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const autoOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...payload,
  },
});

const authError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const authReset = () => ({
  ...initialState,
});

const authSetToken = (state, { payload: { token } }) => ({
  ...state,
  data: {
    ...state.data,
    token,
  },
});

export default createReducer(
  {
    [AUTH_REQUEST]: authRequest,
    [AUTH_OK]: autoOk,
    [AUTH_ERROR]: authError,
    [AUTH_RESET]: authReset,
    [AUTH_SET_TOKEN]: authSetToken,
  },
  initialState
);
