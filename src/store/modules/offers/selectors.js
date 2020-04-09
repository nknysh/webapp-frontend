import { prop, pipe, propOr, filter, propEq, values } from 'ramda';

import { getStatus, getData, getEntities, getResults, getArg } from 'store/common';
import { createSelector } from 'store/utils';

/**
 * Get offers selector
 *
 * @param {object}
 * @returns {object}
 */
export const getOffers = prop('offers');

/**
 * Get offers data selector
 *
 * @param {object}
 * @returns {*}
 */
export const getOffersData = pipe(getOffers, getData);

/**
 * Get offers status selector
 *
 * @param {object}
 * @returns {string}
 */
export const getOffersStatus = pipe(getOffers, getStatus);

/**
 * Get offers results selector
 *
 * @param {object}
 * @returns {string | Array}
 */
export const getOffersResults = pipe(getOffers, getResults);

/**
 * Get offers entities selector
 *
 * @param {object}
 * @returns {object}
 */
export const getOffersEntities = pipe(getOffers, getEntities, prop('content'));

/**
 * Get offers uploads selector
 *
 * @param {object}
 * @returns {object}
 */
export const getOffersUploads = pipe(getOffers, getEntities, propOr({}, 'uploads'));

/**
 * Get offer selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getOffer = createSelector([getArg(1), getOffersEntities], propOr({}));

/**
 * Get offer uploads selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getOfferUploads = createSelector([getArg(1), getOffersUploads], (id, uploads) =>
  pipe(values, filter(propEq('ownerUuid', id)))(uploads)
);
