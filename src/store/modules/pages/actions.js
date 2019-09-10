import { prop } from 'ramda';

import { successAction, errorAction, loadingAction } from 'store/common';

import { PageData } from './config';

export const PAGE = 'PAGE';

/**
 * Get page action
 *
 * @param {string} pageId
 * @returns {object}
 */
export const getPageAction = pageId => ({
  type: PAGE,
  payload: { pageId },
});

/**
 * Get page by id
 *
 * @param {string} pageId
 */
export const getPageById = pageId => dispatch => {
  dispatch(getPageAction(pageId));
  dispatch(loadingAction(PAGE));

  // Page data is hard coded for now
  const data = prop(pageId, PageData);

  data ? dispatch(successAction(PAGE, data)) : dispatch(errorAction(PAGE, { error: 'No data found' }));
};
