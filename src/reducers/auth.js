// App
import createReducer from './createReducer';
import {
  AUTH_REQUEST,
  AUTH_OK,
  AUTH_ERROR,
  AUTH_RESET,
} from '../actions/auth';

const initialState = {
  loading: false,
  request: undefined,
  data: {
    user: undefined,
    token: undefined,
  },
  error: undefined,
};

const handlers = {
  [AUTH_REQUEST]: (state, { payload }) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [AUTH_OK]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      ...payload,
    },
  }),
  [AUTH_ERROR]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload.error,
  }),
  [AUTH_RESET]: () => ({
    ...initialState,
  }),
};

export default createReducer(handlers, initialState);
