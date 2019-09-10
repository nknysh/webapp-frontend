import { prop } from 'ramda';

import { createSelector } from 'store/utils';

import { isAuthenticated } from 'store/modules/auth/selectors';

/**
 * Get ui selector
 *
 * @param {object}
 * @returns {object}
 */
export const getUi = prop('ui');

/**
 * Get ui menus selector
 *
 * @param {object}
 * @returns {object}
 */
export const getUiMenus = createSelector(
  getUi,
  prop('menus')
);

/**
 * Get ui header menu selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getUiHeaderMenu = createSelector(
  getUiMenus,
  isAuthenticated,
  prop('header')
);

/**
 * Get ui footer menu selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getUiFooterMenu = createSelector(
  getUiMenus,
  prop('footer')
);

/**
 * Get ui notifications selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getUiNotifications = createSelector(
  getUi,
  prop('notifications')
);
