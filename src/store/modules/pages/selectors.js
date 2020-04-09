import { prop } from 'ramda';

import { createSelector } from 'store/utils';

/**
 * Get pages selector
 *
 * @param {object}
 * @returns {object}
 */
export const getPages = prop('pages');

/**
 * Get page selector
 *
 * @param {object}
 * @returns {*}
 */
export const getPage = createSelector(getPages, prop('data'));

/**
 * Get page id selector
 *
 * @param {object}
 * @returns {string}
 */
export const getPageId = createSelector(getPage, prop('id'));

/**
 * Get page title selector
 *
 * @param {object}
 * @returns {string}
 */
export const getPageTitle = createSelector(getPage, prop('title'));

/**
 * Get page data selector
 *
 * @param {object}
 * @returns {*}
 */
export const getPageData = createSelector(getPage, prop('data'));

/**
 * Get page links selector
 *
 * @param {object}
 * @returns {*}
 */
export const getPageLinks = createSelector(getPage, prop('links'));

/**
 * Get page hero selector
 *
 * @param {object}
 * @returns {*}
 */
export const getPageHero = createSelector(getPage, prop('hero'));
