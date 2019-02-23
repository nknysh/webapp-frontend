import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { BOOKING_OPTION_REQUEST, BOOKING_OPTIONS_OK, BOOKING_OPTION_ERROR, BOOKING_OPTION_RESET } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const bookingOptionRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const bookingOptionOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const bookingOptionError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const bookingOptionReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [BOOKING_OPTION_REQUEST]: bookingOptionRequest,
    [BOOKING_OPTIONS_OK]: bookingOptionOk,
    [BOOKING_OPTION_ERROR]: bookingOptionError,
    [BOOKING_OPTION_RESET]: bookingOptionReset,
  },
  initialState
);
