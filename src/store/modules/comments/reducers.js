import createReducer from 'store/utils/createReducer';
import utils from 'store/utils';

import { COMMENTS_REQUEST, COMMENTS_OK, COMMENT_ADD_OK, COMMENTS_ERROR, COMMENTS_RESET } from './actions';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const commentsRequest = (state, { payload }) => ({
  ...state,
  loading: true,
  request: payload,
});

const commentsOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response),
  },
});

const commentsAddOk = (state, { payload }) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    ...utils.arrayToMap(payload.response.data),
  },
});

const commentsError = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload.error,
});

const commentsReset = () => ({
  ...initialState,
});

export default createReducer(
  {
    [COMMENTS_REQUEST]: commentsRequest,
    [COMMENTS_OK]: commentsOk,
    [COMMENT_ADD_OK]: commentsAddOk,
    [COMMENTS_ERROR]: commentsError,
    [COMMENTS_RESET]: commentsReset,
  },
  initialState
);
