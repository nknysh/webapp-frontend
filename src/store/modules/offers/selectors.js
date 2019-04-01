import { prop, pipe, curry } from 'ramda';

export const getOffers = prop('offers');

export const getOffersData = state =>
  pipe(
    getOffers,
    prop('data')
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
