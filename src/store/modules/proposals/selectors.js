import { defaultTo, prop, pipe, propOr, values, reduce, length, gte, mergeDeepRight } from 'ramda';

import { getArg, getEntities, getData, getStatus, getResults, getErrors } from 'store/common';
import { createSelector } from 'store/utils';

export const getProposals = prop('proposals');

export const getProposalsStatus = pipe(
  getProposals,
  getStatus
);

export const getProposalsData = pipe(
  getProposals,
  getData
);

export const getProposalsErrors = pipe(
  getProposals,
  getErrors
);

export const getProposalsEntities = pipe(
  getProposals,
  getEntities,
  prop('proposals')
);

export const getProposalsResults = createSelector(
  getProposals,
  getResults
);

export const getProposal = createSelector(
  [getArg(1), getProposalsEntities],
  prop
);

export const getProposalBookings = createSelector(
  getProposal,
  propOr([], 'bookings')
);

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
