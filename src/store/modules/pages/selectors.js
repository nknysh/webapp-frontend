import { createSelector } from 'reselect';
import { prop } from 'ramda';

export const getPages = prop('pages');

export const getPage = createSelector(
  getPages,
  prop('data')
);

export const getPageId = createSelector(
  getPage,
  prop('id')
);

export const getPageTitle = createSelector(
  getPage,
  prop('title')
);

export const getPageData = createSelector(
  getPage,
  prop('data')
);

export const getPageLinks = createSelector(
  getPage,
  prop('links')
);

export const getPageHero = createSelector(
  getPage,
  prop('hero')
);
