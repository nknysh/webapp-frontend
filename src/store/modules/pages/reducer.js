import { prop } from 'ramda';

import createReducer from 'store/utils/createReducer';

import { GET_PAGE } from './actions';
import { PageData } from './config';

const initialState = {};

const getPage = (state, { payload: { pageId } }) => {
  const data = prop(pageId, PageData);

  return pageId && data ? { id: pageId, ...data } : state;
};

export default createReducer(
  {
    [GET_PAGE]: getPage,
  },
  initialState
);
