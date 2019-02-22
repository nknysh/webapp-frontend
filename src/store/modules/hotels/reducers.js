import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { HOTELS_REQUEST, HOTELS_OK, HOTELS_ERROR, HOTELS_RESET } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const hotelsRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const hotelsOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const hotelsError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const hotelsReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [HOTELS_REQUEST]: hotelsRequest,
    [HOTELS_OK]: hotelsOk,
    [HOTELS_ERROR]: hotelsError,
    [HOTELS_RESET]: hotelsReset,
  },
  initialState
);
