import { prop } from 'ramda';

import { successAction, errorAction } from 'store/common/actions';

import { PageData } from './config';

export const FETCH_PAGE = 'FETCH_PAGE';

export const getPageById = pageId => ({
  type: FETCH_PAGE,
  payload: { pageId },
});

export const getPage = pageId => dispatch => {
  dispatch(getPageById(pageId));

  const data = prop(pageId, PageData);

  data ? dispatch(successAction(FETCH_PAGE, data)) : dispatch(errorAction(FETCH_PAGE, { error: 'No data found' }));
};
