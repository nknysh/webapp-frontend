import { prop } from 'ramda';

import { successAction, errorAction, loadingAction } from 'store/common';

import { PageData } from './config';

export const PAGE = 'PAGE';

export const getPageAction = pageId => ({
  type: PAGE,
  payload: { pageId },
});

export const getPageById = pageId => dispatch => {
  dispatch(getPageAction(pageId));
  dispatch(loadingAction(PAGE));

  const data = prop(pageId, PageData);

  data ? dispatch(successAction(PAGE, data)) : dispatch(errorAction(PAGE, { error: 'No data found' }));
};
