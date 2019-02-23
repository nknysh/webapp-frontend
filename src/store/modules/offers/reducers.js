import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { OFFERS_REQUEST, OFFERS_OK, OFFERS_ERROR, OFFERS_RESET } from 'store/modules/offers/actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const offersRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const offersOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const offersError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const offersReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [OFFERS_REQUEST]: offersRequest,
    [OFFERS_OK]: offersOk,
    [OFFERS_ERROR]: offersError,
    [OFFERS_RESET]: offersReset,
  },
  initialState
);
