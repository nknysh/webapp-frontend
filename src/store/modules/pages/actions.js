import { prop } from 'ramda';

import { successAction, errorAction, loadingAction } from 'store/common';

import { PageData } from './config';

export const PAGE = 'PAGE';

export const getPageById = pageId => ({
  type: PAGE,
  payload: { pageId },
});

export const getPage = pageId => dispatch => {
  dispatch(getPageById(pageId));
  dispatch(loadingAction(PAGE));

  const data = prop(pageId, PageData);

  data ? dispatch(successAction(PAGE, data)) : dispatch(errorAction(PAGE, { error: 'No data found' }));
};
