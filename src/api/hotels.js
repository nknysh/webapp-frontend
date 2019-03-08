import client from './index';

export const fetchHotels = ({ order, limit }) =>
  client
    .order(order)
    .limit(limit)
    .get('/hotels');
