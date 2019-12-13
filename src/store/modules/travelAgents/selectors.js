import { prop, propOr, pipe, props, join } from 'ramda';

import { getStatus, getArg } from 'store/common';
import { createSelector } from 'store/utils';

export const getTravelAgents = prop('travelAgents');

export const getTravelAgentsStatus = createSelector(
  getTravelAgents,
  getStatus
);

export const getTravelAgentsEntities = createSelector(
  getTravelAgents,
  prop('data')
);

export const getTravelAgent = createSelector(
  [getArg(1), getTravelAgentsEntities],
  propOr({})
);

export const getTravelAgentFullName = createSelector(
  getTravelAgent,
  pipe(
    props(['title', 'firstName', 'lastName']),
    join(' ')
  )
);
