import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { TRAVEL_AGENTS_REQUEST, TRAVEL_AGENTS_OK, TRAVEL_AGENTS_ERROR, TRAVEL_AGENTS_RESET } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const travelAgentsRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const travelAgentsOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const travelAgentsError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const travelAgentsReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [TRAVEL_AGENTS_REQUEST]: travelAgentsRequest,
    [TRAVEL_AGENTS_OK]: travelAgentsOk,
    [TRAVEL_AGENTS_ERROR]: travelAgentsError,
    [TRAVEL_AGENTS_RESET]: travelAgentsReset,
  },
  initialState
);
