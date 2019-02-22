import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { ROOMS_REQUEST, ROOMS_OK, ROOMS_ERROR, ROOMS_RESET } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const roomsRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const roomsOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const roomsError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const roomsReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [ROOMS_REQUEST]: roomsRequest,
    [ROOMS_OK]: roomsOk,
    [ROOMS_ERROR]: roomsError,
    [ROOMS_RESET]: roomsReset,
  },
  initialState
);
