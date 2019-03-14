import client from './index';

export const getLatestOffers = ({ order, limit }) =>
  client
    .order(order)
    .limit(limit)
    .get('/offers/latest-offers');

export default { getLatestOffers };
