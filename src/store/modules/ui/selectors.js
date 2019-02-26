import { createSelector } from 'reselect';
import { prop } from 'ramda';

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
