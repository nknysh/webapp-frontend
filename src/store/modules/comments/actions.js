import CommentsApi from 'api/comments';

import { fetchHotels } from 'store/modules/hotels/actions';
import { fetchBookings } from 'store/modules/bookings/actions';
import { fetchProposals } from 'store/modules/proposals/actions';
import fetchNestedData from 'store/utils/fetchNestedData';

import { getAuthToken } from 'store/modules/auth/selectors';

const actionCreatorMap = {
  hotel: fetchHotels,
  booking: fetchBookings,
  proposal: fetchProposals,
};

/* eslint-disable no-unused-vars */
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_OK = 'COMMENTS_OK';
export const COMMENT_ADD_OK = 'COMMENT_ADD_OK';
export const COMMENTS_ERROR = 'COMMENTS_ERROR';
export const COMMENTS_RESET = 'COMMENTS_RESET';

const commentsRequest = value => ({
  type: COMMENTS_REQUEST,
  payload: value,
});

const commentsOk = value => ({
  type: COMMENTS_OK,
  payload: value,
});

const commentAddOk = value => ({
  type: COMMENT_ADD_OK,
  payload: value,
});

const commentsError = value => ({
  type: COMMENTS_ERROR,
  payload: value,
});

const commentsReset = value => ({
  type: COMMENTS_RESET,
  payload: value,
});
/* eslint-enable */

const fetchComments = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  if (!args.include) {
    args.include = [];
  }

  const query = args.query || {};
  delete args.query;

  const include = Object.keys(query);
  args.include = args.include.concat(include);

  /* Nested Data
   *  - hotel [hotel]
   *  - booking [booking]
   *  - proposal [proposal]
   */

  dispatch(commentsRequest(args));

  return CommentsApi.fetchComments(args)
    .then(response => {
      const requests = fetchNestedData({
        list: response,
        dispatch,
        token,
        query,
        actionCreatorMap,
      });

      const out = {
        request: args,
        response,
      };

      requests.push(dispatch(commentsOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(commentsError(out));
    });
};

const fetchTravelAgentComments = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  if (!args.include) {
    args.include = [];
  }

  const query = args.query || {};
  delete args.query;

  const include = Object.keys(query);
  args.include = args.include.concat(include);

  /* Nested Data
   *  - hotel [hotel]
   *  - booking [booking]
   *  - proposal [proposal]
   */

  dispatch(commentsRequest(args));

  return CommentsApi.fetchTravelAgentComments(args)
    .then(response => {
      const requests = fetchNestedData({
        list: response,
        dispatch,
        token,
        query,
        actionCreatorMap,
      });

      const out = {
        request: args,
        response,
      };

      requests.push(dispatch(commentsOk(out)));

      return Promise.all(requests);
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(commentsError(out));
    });
};

const fetchComment = (args = {}) => dispatch => {
  args.where = args.where || {};
  args.where = {
    ...args.where,
    id: {
      inq: [args.id],
    },
  };

  delete args.id;

  return dispatch(fetchComments(args));
};

const createComment = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(commentsRequest(args));

  return CommentsApi.createComment(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(commentAddOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(commentsError(out));
    });
};

const updateComment = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(commentsRequest(args));

  return CommentsApi.updateComment(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(commentsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(commentsError(out));
    });
};

const deleteComment = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  args.token = token;

  dispatch(commentsRequest(args));

  return CommentsApi.deleteComment(args)
    .then(response => {
      const out = {
        request: args,
        response,
      };

      return dispatch(commentsOk(out));
    })
    .catch(error => {
      const out = {
        request: args,
        error,
      };

      return dispatch(commentsError(out));
    });
};

const resetComments = (args = {}) => dispatch => Promise.resolve(dispatch(commentsReset(args)));

export {
  fetchComments,
  fetchComment,
  fetchTravelAgentComments,
  createComment,
  updateComment,
  deleteComment,
  resetComments,
};
