import { prop, pipe, propOr, filter, propEq, values } from 'ramda';

import { getStatus, getData, getEntities, getResults, getArg } from 'store/common';
import { createSelector } from 'store/utils';

export const getOffers = prop('offers');

export const getOffersData = pipe(
  getOffers,
  getData
);

export const getOffersStatus = pipe(
  getOffers,
  getStatus
);

export const getOffersResults = pipe(
  getOffers,
  getResults
);

export const getOffersEntities = pipe(
  getOffers,
  getEntities,
  prop('content')
);

export const getOffersUploads = pipe(
  getOffers,
  getEntities,
  propOr({}, 'uploads')
);

export const getOffer = createSelector(
  [getArg(1), getOffersEntities],
  propOr({})
);

export const getOfferUploads = createSelector(
  [getArg(1), getOffersUploads],
  (id, uploads) =>
    pipe(
      values,
      filter(propEq('ownerUuid', id))
    )(uploads)
);
