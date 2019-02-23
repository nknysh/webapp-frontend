import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { BOOKINGS_REQUEST, BOOKINGS_OK, BOOKINGS_ERROR, BOOKINGS_RESET } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};
const bookingsRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const bookingsOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const bookingsError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const bookingsReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [BOOKINGS_REQUEST]: bookingsRequest,
    [BOOKINGS_OK]: bookingsOk,
    [BOOKINGS_ERROR]: bookingsError,
    [BOOKINGS_RESET]: bookingsReset,
  },
  initialState
);
