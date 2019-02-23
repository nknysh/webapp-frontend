// App
import createReducer from 'store/utils/createReducer';
import { AUTH_REQUEST, AUTH_OK, AUTH_ERROR, AUTH_RESET } from './actions';

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

export default createReducer(
  {
    [AUTH_REQUEST]: authRequest,
    [AUTH_OK]: autoOk,
    [AUTH_ERROR]: authError,
    [AUTH_RESET]: authReset,
  },
  initialState
);
