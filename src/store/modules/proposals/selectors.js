import { defaultTo, prop, pipe, propOr, values, reduce, length, gte, mergeDeepRight } from 'ramda';

import { getArg, getEntities, getData, getStatus, getResults, getErrors } from 'store/common';
import { createSelector } from 'store/utils';

/**
 * Get proposals selector
 *
 * @param {object}
 * @returns {object}
 */
export const getProposals = prop('proposals');

/**
 * Get proposals status selector
 *
 * @param {object}
 * @returns {string}
 */
export const getProposalsStatus = pipe(
  getProposals,
  getStatus
);

/**
 * Get proposals data selector
 *
 * @param {object}
 * @returns {*}
 */
export const getProposalsData = pipe(
  getProposals,
  getData
);

/**
 * Get proposals errors selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getProposalsErrors = pipe(
  getProposals,
  getErrors
);

/**
 * Get proposals entities selector
 *
 * @param {object}
 * @returns {object}
 */
export const getProposalsEntities = pipe(
  getProposals,
  getEntities,
  prop('proposals')
);

/**
 * Get proposals results selector
 *
 * @param {object}
 * @returns {string | Array}
 */
export const getProposalsResults = createSelector(
  getProposals,
  getResults
);

export const getProposal = createSelector(
  [getArg(1), getProposalsEntities],
  prop
);

/**
 * Get proposal bookings selector
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getProposalBookings = createSelector(
  getProposal,
  propOr([], 'bookings')
);

/**
 * Get proposal key value selector
 *
 * @param {object}
 * @returns {Array}
 */
export const getProposalsKeyValue = createSelector(
  getProposalsEntities,
  pipe(
    defaultTo({}),
    values,
    reduce(
      (accum, { bookings = [], uuid, name }) =>
        gte(length(bookings), 3) ? accum : mergeDeepRight(accum, { [uuid]: name }),
      {}
    )
  )
);
