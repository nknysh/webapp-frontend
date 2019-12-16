import { prop, propOr, pipe, props, join, reduce } from 'ramda';

import { getStatus, getArg } from 'store/common';
import { createSelector } from 'store/utils';
import { TravelAgent, TravelAgentsDomain } from './model';

export const getTravelAgents = (state: any): TravelAgentsDomain => prop('travelAgents', state);

export const getTravelAgentsStatus = createSelector(
  getTravelAgents,
  getStatus
);

export const getTravelAgentsEntities = createSelector(
  getTravelAgents,
  (domain: TravelAgentsDomain): object =>
    pipe(
      propOr([], 'data'),
      reduce((acc: object, cur: TravelAgent) => ({
        ...acc,
        [cur.uuid]: cur
      }), {})
    )(domain)
);

export const getTravelAgent = createSelector(
  [getArg(1), getTravelAgentsEntities],
  (id: string, entities: object): TravelAgent => propOr({}, id, entities)
);

export const getTravelAgentFullName = createSelector(
  getTravelAgent,
  (ta: TravelAgent) =>
    pipe(
      props(['title', 'firstName', 'lastName']),
      join(' ')
    )(ta)
);
