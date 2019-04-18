import { prop, pipe, curry } from 'ramda';

import { getStatus, getData, getEntities, getResults } from 'store/common/selectors';

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
  prop('offers')
);

export const getOffer = curry((state, id) =>
  pipe(
    getOffersEntities,
    prop(id)
  )(state)
);
