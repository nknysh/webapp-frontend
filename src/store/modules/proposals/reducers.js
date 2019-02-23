import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { PROPOSALS_REQUEST, PROPOSALS_OK, PROPOSALS_ERROR, PROPOSALS_RESET } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const proposalsRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const proposalsOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const proposalsError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const proposalsReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [PROPOSALS_REQUEST]: proposalsRequest,
    [PROPOSALS_OK]: proposalsOk,
    [PROPOSALS_ERROR]: proposalsError,
    [PROPOSALS_RESET]: proposalsReset,
  },
  initialState
);
