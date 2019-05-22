import { prop } from 'ramda';

import { createSelector } from 'store/utils';

import { isAuthenticated } from 'store/modules/auth/selectors';

export const getUi = prop('ui');

export const getUiMenus = createSelector(
  getUi,
  prop('menus')
);

export const getUiHeaderMenu = createSelector(
  getUiMenus,
  isAuthenticated,
  prop('header')
);

export const getUiFooterMenu = createSelector(
  getUiMenus,
  prop('footer')
);

export const getUiNotifications = createSelector(
  getUi,
  prop('notifications')
);
