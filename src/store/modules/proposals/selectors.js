import { defaultTo, prop, pipe, map, propOr, partial, values, reduce, length, gte, mergeDeepRight } from 'ramda';

import { getState, getUnary, getEntities, getData, getStatus, getResults, getErrors } from 'store/common';
import { createSelector } from 'store/utils';

import { getBooking } from 'store/modules/bookings/selectors';

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
  [getUnary, getProposalsEntities],
  prop
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

export const getBookingsForProposal = createSelector(
  [getState, getProposal],
  (state, proposal) =>
    pipe(
      propOr([], 'bookings'),
      map(partial(getBooking, [state]))
    )(proposal)
);
