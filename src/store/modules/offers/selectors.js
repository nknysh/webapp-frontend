import { map, prop, pipe, curry, when, complement, isNil, propOr } from 'ramda';

import { selectRelationships } from 'store/common/selectors';

import schema from './schema';

export const getOffers = prop('offers');

export const getOffersData = state =>
  pipe(
    getOffers,
    prop('data'),
    when(complement(isNil), map(selectRelationships(state, propOr({}, 'relationships', schema))))
  )(state);

export const getOffersStatus = pipe(
  getOffers,
  prop('status')
);

export const getOffer = curry((state, index) =>
  pipe(
    getOffersData,
    prop(index)
  )(state)
);
